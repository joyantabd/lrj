<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderDetailResource;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
       $orders = (new Order())->getData($request->all());
       return OrderResource::collection($orders);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {

        try{
            DB::beginTransaction();
            $order = (new Order())->placeOrder($request->all());
            DB::commit();
            return response()->json(['msg'=>'Order Placed Successfully','cls'=>'success','order_id'=>$order->id]);
        }
        catch(\Throwable $e){
            info('ORDER_FAILED',['message'=>$e->getMessage(),$e]);
            DB::rollBack();
            return response()->json(['msg'=>$e->getMessage(),'cls'=>'warning','flag'=>'true']);

        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['customer','payment_method','sales_manager',
        'shop','order_details',
        'transactions','transactions.customer','transactions.payment_method','transactions.transactionable',
    ]);
        return new OrderDetailResource($order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
       
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
