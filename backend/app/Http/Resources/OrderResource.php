<?php

namespace App\Http\Resources;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $payment_status = 'Unpaid';
        if($this->payment_status == Order::PAYMENT_STATUS_PAID){
            $payment_status = 'Paid';
        }elseif($this->payment_status == Order::PAYMENT_STATUS_PARTIAL){
            $payment_status = 'Partial Paid';
        }

        return [
            'id' => $this->id,
            'customer_name' =>$this->customer?->name,
            'customer_phone' =>$this->customer?->phone,
            'order_number' =>$this->order_number,
            'order_status' =>$this->order_status,
            'order_status_text' =>$this->order_status == Order::STATUS_COMPLETED ? 'Completed' : 'Pending',
            'payment_method' =>$this->payment_method?->name,
            'payment_status' =>$payment_status,
            'sales_manager' =>$this->sales_manager?->name,
            'shop' =>$this->shop?->name,
            'created_at' =>$this->created_at->format('d-M-y'),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->format('d-M-y') : 'Not Updated',

            'discount' =>$this->discount,
            'paid_amount' =>$this->paid_amount,
            'due_amount' =>$this->due_amount,
            'quantity' =>$this->quantity,
            'sub_total' =>$this->sub_total,
            'total' =>$this->total,

        ];
    }
}
