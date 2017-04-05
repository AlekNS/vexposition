<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Exposition Event.
 *
 * Class Event
 * @package App\Models
 * @property integer $id
 * @property string $name
 * @property string $start_date
 * @property string $end_date
 * @property string $location_city
 * @property string $location_address
 * @property double $location_lat
 * @property double $location_lng
 * @property string $img_url
 * @property boolean $is_notified
 */
class Event extends Model
{
    protected $table = 'events';

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'location_city',
        'location_address',
        'location_lat',
        'location_lng',
        'img_url'
    ];

    protected $dates = [
        'start_date',
        'end_date'
    ];

    // @TODO: Move out it to config().
    const DEFAULT_DATE_FORMAT = 'd M Y';

    public function stands()
    {
        return $this->hasMany('\App\Models\Stand', 'event_id');
    }

    public function toArray()
    {
        $result = parent::toArray();
        $result['img_url'] = config('app.event_images_url') . '/' . $result['img_url'];
        $result['start_date'] = $this->start_date->format(self::DEFAULT_DATE_FORMAT);
        $result['end_date'] = $this->end_date->format(self::DEFAULT_DATE_FORMAT);
        return $result;
    }
}
