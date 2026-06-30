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
        Schema::create('professional_notes', function (Blueprint $table) {
            $table->id();
            $table->string('titre_fr');
            $table->string('titre_ar');
            $table->text('contenu_fr');
            $table->text('contenu_ar');
            $table->string('type'); // note, circulaire, formation, annonce
            $table->string('fichier')->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('professional_notes');
    }
};
