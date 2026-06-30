<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appels_offres', function (Blueprint $table) {
            $table->id();
            $table->string('titre_fr');
            $table->string('titre_ar');
            $table->text('description_fr');
            $table->text('description_ar');
            $table->string('type'); // appel_offres, recrutement, concours, resultat
            $table->string('fichier')->nullable();
            $table->date('date_limite')->nullable();
            $table->date('date_publication');
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appels_offres');
    }
};
