<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreSalesManagerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'address' => 'required|min:3|max:255',
            'area_id' => 'required|numeric',
            'district_id' => 'required|numeric',
            'division_id' => 'required|numeric',
            'email' => 'required|email',
            'phone' => 'required|numeric',
            'shop_id' => 'required|numeric',
            'name' => 'required|min:3|max:255',
            'password' => ['required',Password::min(8)->mixedCase()->letters()->numbers()->symbols()->uncompromised()],
            'description' => 'max:1000',
            'nid' => 'required',
            'landmark' => 'max:255',
            'photo' =>'required',
            'nid_photo' =>'required'
        ];
    }
}
