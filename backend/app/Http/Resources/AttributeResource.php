<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttributeResource extends JsonResource
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
            'value' => AttributeValueResource::collection($this->value), 
            'original_status' =>$this->status,
            'status' =>$this->status ==1 ? 'Active' : 'Inactive',
            'created_at' =>$this->created_at->format('d-M-y'),
            'created_by' =>$this->user?->name,
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->format('d-M-y') : 'Not Updated',
        ];
    }
}
