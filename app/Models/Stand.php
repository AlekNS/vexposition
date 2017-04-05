<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Stand in exposition of event.
 *
 * Class Stand
 * @package App\Models
 * @property integer $id
 * @property integer $event_id
 * @property string $name
 * @property double $price_usd
 * @property string $price - Dynamic price_usd field
 * @property string $img_url
 * @property string $description
 */
class Stand extends Model
{
    protected $table = 'stands';

    protected $fillable = [
        'name',
        'price_usd',
        'img_url',
        'description'
    ];

    protected $appends = [
        'price'
    ];

    protected $hidden = [
        'pivot',
        'price_usd'
    ];

    public function event()
    {
        return $this->belongsTo('\App\Models\Event', 'event_id');
    }

    public function companies()
    {
        return $this->belongsToMany('\App\Models\Company', 'company_booking')->withPivot(['file_url']);
    }

    public function getPriceAttribute()
    {
        // @TODO: Should be more universal.
        return money_format('$%i', $this->price_usd);
    }

    public function toArray()
    {
        $result = parent::toArray();
        $result['img_url'] = config('app.stand_images_url') . '/' . $result['img_url'];

        // reformat result
        unset($result['companies']);
        if ($this->companies !== null && count($this->companies) > 0) {
            unset($result['price_usd']);
            unset($result['price']);
            $result['img_url'] = config('app.company_logos_url') . '/' . $this->companies[0]->logo_url;

            // Prevent viewing private company data
            if (!\Auth::guest()) {
                $result['owner'] = $this->companies[0]->toArray();
                if (isset($this->companies[0]->pivot->file_url)) {
                    $result['owner']['documents'] = [[
                        'url' => config('app.company_files_url') . '/' . $this->companies[0]->pivot->file_url
                    ]];
                }
            }
        }

        return $result;
    }
}
