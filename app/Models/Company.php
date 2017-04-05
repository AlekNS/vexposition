<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Participant of exposition.
 *
 * Class Company
 * @package App\Models
 * @property integer $id
 * @property string $name
 * @property string $phone
 * @property string $email
 * @property string $address
 * @property string $logo_url
 * @property string $admin_email
 */
class Company extends Model
{
    protected $table = 'companies';

    protected $fillable = [
        'name',
        'phone',
        'email',
        'address',
        'logo_url',
        'admin_email'
    ];

    protected $hidden = [
        'pivot'
    ];

    public function stands()
    {
        return $this->belongsToMany('\App\Models\Stand', 'company_booking')->withPivot(['file_url']);
    }

    public function toArray()
    {
        $result = parent::toArray();
        $result['logo_url'] = config('app.company_logos_url') . '/' . $result['logo_url'];
        return $result;
    }
}
