<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;
    protected $fillable = ['name','status','user_id'];
    public const STATUS_ACTIVE = 1;

    public function getDataIdName(){
        return self::query()->select('id','name')
                    ->with('value:id,name,attribute_id')
                    ->where('status',self::STATUS_ACTIVE)
                    ->orderBy('name','asc')->get();
    }

    public function getAttributeList()
    {

       return self::query()->with(['user','value','value.user:id,name'])->orderBy('id','desc')->paginate(10);
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function value() 
    {
        return $this->hasMany(AttributeValue::class);
    }
}
