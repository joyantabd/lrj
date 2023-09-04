<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopEditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' =>$this->name,
            'email' =>$this->email,
            'phone' =>$this->phone,
            'description' =>$this->description,
            'status' =>$this->status,
            'photo_preview' => ImageManager::imageUrl(Shop::THUMB_IMAGE_UPLOAD_PATH,$this->photo),
            'address' => $this->address?->address, 
            'division_id' => $this->address?->division_id, 
            'district_id' => $this->address?->district_id, 
            'area_id' => $this->address?->area_id, 
            'landmark' => $this->address?->landmark
            

        ];
    }
}
