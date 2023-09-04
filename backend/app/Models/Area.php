<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function getAreaByDistrictId($id)
    {
        return self::query()->where('district_id',$id)->select('id','name')->get();
    }
}
