<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Manager\PriceManager;
use App\Manager\ReportManager;
use App\Models\Product;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $report_manager = new ReportManager();
        $reports = [
            'total_product' => $report_manager->total_products,
            'total_stock' => $report_manager->total_stock,
            'low_stock' => $report_manager->low_stock,
            'buy_value' =>  PriceManager::formatPrice($report_manager->low_stock_cost),
            'sell_value' => PriceManager::formatPrice($report_manager->selling_stock_price),
            'possible_profit' => PriceManager::formatPrice($report_manager->possible_profit),
            'total_sale' => PriceManager::formatPrice($report_manager->total_sell),
            'total_purchase' => PriceManager::formatPrice($report_manager->total_purchase),
            'today_total_sale' => PriceManager::formatPrice($report_manager->today_total_sell),
            'today_total_purchase' => PriceManager::formatPrice($report_manager->today_total_purchase),
        ];
        return response()->json($reports);
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
    public function store(StoreReportRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReportRequest $request, Report $report)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        //
    }
}
