<?php

namespace App\Manager;

use App\Models\Area;
use App\Models\Country;
use App\Models\District;
use App\Models\Division;
use Illuminate\Support\Facades\Http;

class ScriptManager
{

    public function getLocationData()
    {

        $url = 'https://member.daraz.com.bd/locationtree/api/getSubAddressList?countryCode=BD&page=addressEdit';
        
        $response = Http::get($url);
        $divisions = json_decode($response->body(),true);
        foreach($divisions['module'] as  $key=>$division)
        {
            if($key ==7)
            {
                $division_data['name'] = $division['name'];
                $division_data['original_id'] = $division['id'];
                $divi = Division::create($division_data);
                $dist_add = 'https://member.daraz.com.bd/locationtree/api/getSubAddressList?countryCode=BD&addressId='.$division['id'].'&page=addressEdit';
                $dist_response = Http::get($dist_add);
                $districts = json_decode($dist_response->body(),true);
                foreach($districts['module'] as $disctrict)
                {
                $disctrict_data['division_id'] = $divi->id;
                $disctrict_data['name'] = $disctrict['name'];
                $disctrict_data['original_id'] = $disctrict['id'];
                $dis = District::create($disctrict_data);
    
                $area = 'https://member.daraz.com.bd/locationtree/api/getSubAddressList?countryCode=BD&addressId='.$disctrict['id'].'&page=addressEdit';
                $area_response = Http::get($area);
                $areas = json_decode($area_response->body(),true);
                foreach($areas['module'] as $area)
                {
                $area_data['district_id'] = $dis->id;
                $area_data['name'] = $area['name'];
                $area_data['original_id'] = $area['id'];
                Area::create($area_data);
                }
                }
    
            }
            
        }
    }

    public function getCountry(){
        $url = 'https://restcountries.com/v3.1/all';
        $response = Http::get($url);
        $countries = json_decode($response->body(),true);
        foreach($countries as $country)
        {
            $country_data['name'] = $country['name']['common'];
            Country::create($country_data);

        }
    }
}