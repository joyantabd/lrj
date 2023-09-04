<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class SalesManager extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = ['name','email','phone','nid','shop_id','password','status','description','photo','nid_photo','user_id'];
    const STATUS_ACTIVE = 1;
    const STATUS_ACTIVE_TEXT = 'Active';
    const STATUS_INACTIVE = 0;
    const STATUS_INACTIVE_TEXT = 'Inactive';
    const PHOTO_WIDTH = 800;
    const PHOTO_HEIGHT = 800;
    const PHOTO_THUMB_WIDTH = 150;
    const PHOTO_THUMB_HEIGHT = 150;
    const IMAGE_UPLOAD_PATH = 'images/uploads/sales_manager/';
    const THUMB_IMAGE_UPLOAD_PATH = 'images/uploads/sales_manager_thumb/';


    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function prepareData (array $input)
    {

        $data['description'] = $input['description'] ?? null;
        $data['email'] = $input['email'] ?? null;
        $data['name'] = $input['name'] ?? null;
        $data['phone'] = $input['phone'] ?? null;
        $data['nid'] = $input['nid'] ?? null;
        $data['password'] = Hash::make($input['password']);
        $data['status'] = $input['status'] ?? 0;
        $data['shop_id'] = $input['shop_id'];
        $data['user_id'] = Auth::user()->id;

        return $data;
    }

    public function UpdateData ($input){
        $data['description'] = $input['description'] ?? null;
        $data['email'] = $input['email'] ?? null;
        $data['name'] = $input['name'] ?? null;
        $data['phone'] = $input['phone'] ?? null;
        $data['nid'] = $input['nid'] ?? null;
        $data['status'] = $input['original_status'] ?? 0;
        $data['shop_id'] = $input['shop_id'];
        $data['user_id'] = Auth::user()->id;

        return $data;
    }

    public function getData(array $input)
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query()->with('user:id,name','shop:id,name','address','address.division:id,name','address.district:id,name','address.area:id,name');
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

    public function shop() 
    {
        return $this->belongsTo(Shop::class);
    }

    public function address()
    {
        return $this->morphOne(Address::class,'addressable');
    }

    public function transaction()
    {
        return $this->morphOne(Transaction::class,'transactionable');
    }
}
