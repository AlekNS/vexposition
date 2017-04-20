<?php

namespace App\Http\Controllers\Api\Resource;

/**
 * @apiDefine UserNotAuthorizedError
 *
 * @apiError UserNotAuthorized The User was not authorized.
 *
 * @apiErrorExample Unauthorized:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "status": "Unauthorized"
 *     }
 */

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

/**
 * Base controller to sharing common methods.
 *
 * Class ResourceController
 * @package App\Http\Controllers\Api\Resource
 */
abstract class ResourceController extends Controller
{

    /**
     * @return array
     */
    protected function getValidationRules()
    {
        return [];
    }

    /**
     * Extract necessary fields from the request
     * @param Request $request
     * @return mixed
     */
    protected function getFields(Request $request)
    {
        return $request->all()->filter(array_keys($this->getValidationRules()));
    }

    /**
     * Format response for index request.
     *
     * @param $data
     * @return array
     */
    protected function formatIndex($data)
    {
        return [
            'total' => $data->total(),
            'rows' => $data->all(),
        ];
    }

    /**
     * @param Request $request
     * @param $query
     * @return array
     */
    protected function baseIndex(Request $request, $query)
    {
        if (in_array($request->get('sort'), array_keys($this->getValidationRules()))) {
            $sortColumn = $request->get('sort');
            $sortDirection = $request->get('order', 'desc') == 'desc' ? 'desc' : 'asc';
        } else {
            $sortColumn = array_first(array_keys($this->getValidationRules()));
            $sortDirection = 'asc';
        }

        if (!empty($sortColumn)) {
            $query->orderBy($sortColumn, $sortDirection);
        }

        $request->offsetSet('limit', $request->get('limit', 10));

        return $this->formatIndex($query->paginate(
            $request->get('limit'),
            ['*'],
            'page',
            $request->get('limit') ? ($request->get('offset') / $request->get('limit') + 1) : 1
        ));
    }

    /**
     * @param Request $request
     * @param $modelClass
     * @param array $mergeOtherFields
     * @return mixed
     */
    protected function baseStore(Request $request, $modelClass, array $mergeOtherFields = [])
    {
        $this->validate($request, $this->getValidationRules());
        return $modelClass::create($this->getFields($request, $mergeOtherFields))->toArray();
    }

    /**
     * @param Request $request
     * @param Model $model
     * @return array
     */
    protected function baseUpdate(Request $request, Model $model)
    {
        $this->validate($request, $this->getValidationRules());
        $model->fill($this->getFields($request))->save();
        return $model->toArray();
    }

    /**
     * @param Model $model
     * @return array
     */
    protected function baseDelete(Model $model)
    {
        $model->delete();
        return $model->toArray();
    }
}
