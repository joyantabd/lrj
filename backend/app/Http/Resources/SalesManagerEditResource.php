<?php

namespace App\Http\Resources;

use App\Manager\ImageManager;
use App\Models\SalesManager;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesManagerEditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'shop' => $this->shop?->name,
            'id' => $this->id,
            'name' =>$this->name,
            'email' =>$this->email,
            'phone' =>$this->phone,
            'description' =>$this->description,
            'nid' => $this->nid,
            'status' =>$this->status == SalesManager::STATUS_ACTIVE ? SalesManager::STATUS_ACTIVE_TEXT : SalesManager::STATUS_INACTIVE_TEXT,
            'original_status' =>$this->status,
            'photo_full' => ImageManager::imageUrl(SalesManager::THUMB_IMAGE_UPLOAD_PATH,$this->photo),
            'nid_photo_full' => ImageManager::imageUrl(SalesManager::THUMB_IMAGE_UPLOAD_PATH,$this->nid_photo),
            'created_by' =>$this->user?->name,
            'created_at' =>$this->created_at->format('d-M-y'),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->format('d-M-y') : 'Not Updated',
            'address' => $this->address?->address, 
            'division_id' => $this->address?->division_id, 
            'district_id' => $this->address?->district_id, 
            'area_id' => $this->address?->area_id, 
            'landmark' => $this->address?->landmark,
            'shop_id' => $this->shop_id, 
            

        ];
    }
}
