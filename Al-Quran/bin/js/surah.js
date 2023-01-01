var Uri;
$(document).ready(function () {
    
    var Uri = new URL(window.location.href);
    var surahId = Uri.searchParams.get("id");
    
    var x = parseInt(surahId) - 1;

    $.ajax({
        type: "GET",
        url: "https://quran.kemenag.go.id/api/v1/surah/"+x+"/1",
        success: function (response) {
            console.log();
            var get = response["data"][0];

            if(!response["data"][0]){
                $("body").html('<div class="position-fixed w-100 h-100 top-0 end-0 bottom-0 start-0 bg-white d-flex justify-content-center align-items-center" style="z-index: 100;"><div class="w-auto h-auto"><h1 class="bi bi-emoji-dizzy text-center color-4" style="font-size: 100px;"></h1><h2 class="mt-4 text-center fw-bold color-4 fw-bold">404 Server</h2><p class="text-muted text-center">Ayat Alquran Tidak Di Temukan</p><button class="btn btn-success Bgcolor-4 mx-auto d-block px-5" onclick="window.location.href = \'../\';">Kembali Ke Halaman Utama</button></div></div>');
                return false;
            }
            $("#NameSurah").html(get["surat_name"]);
            $("#terjemah").html(get["surat_terjemahan"]);
            $("#golongan").html(get["golongan_surah"]);
            $("#arabSurah").html(get["surat_text"]);
            $("#jumlah").html(get["count_ayat"]);

            var surahAyat = get["count_ayat"];
        
            $.ajax({
                type: "GET",
                url: "https://quran.kemenag.go.id/api/v1/ayatweb/"+surahId+"/0/0/"+surahAyat,
                success: function (response) {
                    if(!response["data"][0]){
                        $("body").html('<div class="position-fixed w-100 h-100 top-0 end-0 bottom-0 start-0 bg-white d-flex justify-content-center align-items-center" style="z-index: 100;"><div class="w-auto h-auto"><h1 class="bi bi-emoji-dizzy text-center color-4" style="font-size: 100px;"></h1><h2 class="mt-4 text-center fw-bold color-4 fw-bold">404 Server</h2><p class="text-muted text-center">Ayat Alquran Tidak Di Temukan</p><button class="btn btn-success Bgcolor-4 mx-auto d-block px-5" onclick="window.location.href = \'../\';">Kembali Ke Halaman Utama</button></div></div>');
                        return false;
                    }
                    response["data"].forEach(listAda);
                    $("#load").remove();
                    $("#main").removeClass("d-none");
                }, 
                error: function (xhr, ajaxOptions, thrownError) {
                    $("body").html('<div class="position-fixed w-100 h-100 top-0 end-0 bottom-0 start-0 bg-white d-flex justify-content-center align-items-center" style="z-index: 100;"><div class="w-auto h-auto"><h1 class="bi bi-emoji-dizzy text-center color-4" style="font-size: 100px;"></h1><h2 class="mt-4 text-center fw-bold color-4 fw-bold">404 Server</h2><p class="text-muted text-center">Maaf terjadi kesalahan pada server</p><button class="btn btn-success Bgcolor-4 mx-auto d-block px-5" onclick="window.location.reload();">Coba Lagi</button></div></div>');
                }
            });

        }, 
        error: function (xhr, ajaxOptions, thrownError) {
            $("body").html('<div class="position-fixed w-100 h-100 top-0 end-0 bottom-0 start-0 bg-white d-flex justify-content-center align-items-center" style="z-index: 100;"><div class="w-auto h-auto"><h1 class="bi bi-emoji-dizzy text-center color-4" style="font-size: 100px;"></h1><h2 class="mt-4 text-center fw-bold color-4 fw-bold">404 Server</h2><p class="text-muted">Maaf terjadi kesalahan pada server</p><button class="btn btn-success Bgcolor-4 mx-auto d-block px-5" onclick="window.location.reload();">Coba Lagi</button></div></div>');
        }
    });






});


function listAda(item, index, arr) {
    var Ayat = item["teks_ayat"];
    var terjemahan = item["teks_terjemah"];
    var jumlah = item["no_ayat"];
    var ket = item["teks_fn"];
    var classAdd;

    if(ket == ""){
        classAdd = "d-none";
    }

    var html = '<div class="border-bottom pb-3 mb-3"><p class="text-muted">Ayat '+jumlah+'</p><h1 class="arabic text-end">'+Ayat+'</h1><p class="m-0">'+terjemahan+'</p><p class="text-muted m-0 '+classAdd+'" style="font-size: 14px;">'+ket+'</p></div>';
    $("#Ayat").append(html);
}

