<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('page')->index();
            $table->string('key')->unique();
            $table->string('label_fr')->nullable();
            $table->string('label_ar')->nullable();
            $table->longText('value_fr')->nullable();
            $table->longText('value_ar')->nullable();
            $table->string('type')->default('text'); // text, html, list_json
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_contents');
    }
};
