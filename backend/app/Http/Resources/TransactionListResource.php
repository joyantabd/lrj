<?php

namespace App\Http\Resources;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'amount'=>$this->amount,
            'created_at' =>$this->created_at->toDayDateTimeString(),
            'customer_name'=>$this->customer?->name,
            'customer_phone'=>$this->customer?->phone,
            'payment_method'=>$this->payment_method?->name,
            'account_number'=>$this->payment_method?->account_number,
            'trx_id'=>$this->trx_id,
            'trx_type'=>$this->trx_type == Transaction::CREDIT ? 'CREDIT' : 'DEBIT',
            'transaction_by'=>$this->transactionable?->name,
            'status'=>$this->status == Transaction::SUCCESS ? 'Success' : 'Failed',
        ];
    }
}
