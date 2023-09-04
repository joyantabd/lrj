<?php

namespace App\Http\Resources;

use App\Manager\PriceManager;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductBarCodeResource extends JsonResource
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
            'sku' =>$this->sku,
            'price' =>$this->price . PriceManager::CURRENCY_SYMBOL,
            'sell_price' => PriceManager::calculate_sell_price($this->price,$this->discount_percent,$this->discount_fixed,$this->discount_start,$this->discount_end),
        ];
    }
}
