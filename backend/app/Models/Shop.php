<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Shop extends Model
{
    use HasFactory;
    protected $fillable = ['name','email','phone','status','description','photo','user_id'];
    const STATUS_ACTIVE = 1;
    const STATUS_ACTIVE_TEXT = 'Active';
    const STATUS_INACTIVE = 0;
    const STATUS_INACTIVE_TEXT = 'Inactive';
    const PHOTO_WIDTH = 800;
    const PHOTO_HEIGHT = 800;
    const PHOTO_THUMB_WIDTH = 150;
    const PHOTO_THUMB_HEIGHT = 150;
    const IMAGE_UPLOAD_PATH = 'images/uploads/shop/';
    const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/shop_thumb/';

    public function prepareData (array $input)
    {

        $shop['description'] = $input['description'] ?? '';
        $shop['email'] = $input['email'] ?? '';
        $shop['name'] = $input['name'] ?? '';
        $shop['phone'] = $input['phone'] ?? '';
        $shop['status'] = $input['status'] ?? '';
        $shop['user_id'] = Auth::user()->id;

        return $shop;
    }

    public function getData(array $input)
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query()->with('user:id,name','address','address.division:id,name','address.district:id,name','address.area:id,name');
        if(!empty($input['search'])){
            $query->where('name','like','%'.$input['search'].'%')
            ->orwhere('email','like','%'.$input['search'].'%')
            ->orwhere('phone','like','%'.$input['search'].'%');
        }
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'],$input['dirrection'] ?? 'asc');
        }

       return $query->paginate($per_page);
    }



    public function getDataIdName(){
        return self::query()->select('id','name')->where('status',self::STATUS_ACTIVE)->orderBy('name','asc')->get();
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function address()
    {
        return $this->morphOne(Address::class,'addressable');
    }

    public function getShopDetails($shop_id) {

        return self::query()->with('address','address.division:id,name','address.district:id,name','address.area:id,name')->findOrFail($shop_id);
        
    }
}
