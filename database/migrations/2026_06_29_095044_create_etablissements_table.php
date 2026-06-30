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
        Schema::create('etablissements', function (Blueprint $table) {
            $table->id();
            $table->string('nom_fr');
            $table->string('nom_ar');
            $table->string('type'); // CHU, EPH, EPSP, Polyclinique, Salle de soins, Maternité, Urgence, Privé
            $table->string('adresse_fr');
            $table->string('adresse_ar');
            $table->string('telephone')->nullable();
            $table->string('email')->nullable();
            $table->text('specialites_fr')->nullable();
            $table->text('specialites_ar')->nullable();
            $table->string('horaires')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('responsable')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etablissements');
    }
};
