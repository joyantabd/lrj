<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Resources\ShopResource;
use App\Models\SalesManager;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public const ADMIN = 1;
    public const SALES_MANAGER = 2;

    final public function login(AuthRequest $request)
    {

        if($request->input('user_type') == self::ADMIN){
        $data =   User::whereEmail($request->input('email'))->first();
        $role = self::ADMIN;
        }
        else{
        $data = SalesManager::whereEmail($request->input('email'))->first();  
        $role = self::SALES_MANAGER;

        }

        if( $data && Hash::check($request->input('password'),$data->password)){
            $branch = null;
            if(self::SALES_MANAGER){
                $branch = (new Shop())->getShopDetails($data->shop_id);
            }
        $data =([
            'token' => $data->createToken($data->email)->plainTextToken,
            'name' =>$data->name,
            'email' =>  $data->email,
            'phone' => $data->phone,
            'photo' =>$data->photo,
            'role' => $role,
            'branch' => new ShopResource($branch)

        ]);
        return response()->json($data);
    }




        throw ValidationException::withMessages([
            'email' => ['Email is Invalid']
        ]);


    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(['msg'=>'Logged Out']);
    }
}
