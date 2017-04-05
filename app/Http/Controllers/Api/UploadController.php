<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * Upload data from the user.
 * @TODO: Should be added garbage collector for deleting unused files.
 *
 * Class UploadController
 * @package App\Http\Controllers\Api
 */
class UploadController extends Controller
{
    public function postUploadImage($uploadType, Request $request)
    {
        // @TODO: Add subfolders or move it to the cloud storage.
        if ($request->file('file')) {
            $isImage = $uploadType == 'image';

            $file = $request->file('file');
            $fileName = sprintf(
                '%s.%s',
                md5($file->getClientOriginalName().rand()),
                mb_strtolower(''.$file->getClientOriginalExtension())
            );
            $file->move(public_path('public/' . ($isImage ? 'images' : 'files')), $fileName);

            return response()->json([
                'file_name' => $fileName
            ]);
        }

        return response()->json(false, 200);
    }
}
