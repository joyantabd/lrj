<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Supplier extends Model
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
    const IMAGE_UPLOAD_PATH = 'images/uploads/supplier/';
    const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/supplier_thumb/';

    public function prepareData (array $input)
    {

        $supplier['description'] = $input['description'] ?? '';
        $supplier['email'] = $input['email'] ?? '';
        $supplier['name'] = $input['name'] ?? '';
        $supplier['phone'] = $input['phone'] ?? '';
        $supplier['status'] = $input['status'] ?? '';
        $supplier['user_id'] = Auth::user()->id;

        return $supplier;
    }

    public function getSuppliers(array $input)
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
}
