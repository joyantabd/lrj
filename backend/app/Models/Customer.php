<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = ['name','email','phone','user_id'];

    public function StoreData($input)
    {
        return self::create($this->PrepareDate($input));
    }

    private function PrepareDate($input)
    {

      return [
        'name' => $input['name'] ?? '',
        'email' => $input['email'] ?? '',
        'phone' => $input['phone'] ?? '',
        'user_id' => Auth::user()->id,

        ];

    }

    public function getAllData(array $input)
    {
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();
        if(!empty($input['search'])){
            $query->where('name','like','%'.$input['search'].'%')
                    ->orWhere('phone','like','%'.$input['search'].'%');
        }
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'],$input['dirrection'] ?? 'asc');
        }

       return $query->with('user:id,name')->paginate($per_page);
    }

    public function user() 
    {
        return $this->belongsTo(User::class,'user_id');
    }


}
