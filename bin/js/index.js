$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://quran.kemenag.go.id/api/v1/surah/0/114",
        success: function (response) {
            if(response["data"] == ""){
                $("body").html('<div class="position-fixed w-100 h-100 top-0 end-0 bottom-0 start-0 bg-white d-flex justify-content-center align-items-center" style="z-index: 100;"><div class="w-auto h-auto"><h1 class="bi bi-emoji-dizzy text-center color-4" style="font-size: 100px;"></h1><h2 class="mt-4 text-center fw-bold color-4 fw-bold">404 Server</h2><p class="text-muted">Maaf terjadi kesalahan pada server</p><button class="btn btn-success Bgcolor-4 mx-auto d-block px-5" onclick="window.location.reload();">Coba Lagi</button></div></div>');
                return false;
            }
            response["data"].forEach(listAda);
            $("#load").remove();
            $("#main").removeClass("d-none");
        }, 
        error: function (xhr, ajaxOptions, thrownError) {
            $("body").html('<div class="position-fixed w-100 h-100 top-0 end-0 bottom-0 start-0 bg-white d-flex justify-content-center align-items-center" style="z-index: 100;"><div class="w-auto h-auto"><h1 class="bi bi-emoji-dizzy text-center color-4" style="font-size: 100px;"></h1><h2 class="mt-4 text-center fw-bold color-4 fw-bold">404 Server</h2><p class="text-muted">Maaf terjadi kesalahan pada server</p><button class="btn btn-success Bgcolor-4 mx-auto d-block px-5" onclick="window.location.reload();">Coba Lagi</button></div></div>');
        }
    });

});


function listAda(item, index, arr) {

    var namaSurah = item["surat_name"];
    var idSurah = item["id"];
    var terjemahan = item["surat_terjemahan"];
    var suratArabic = item["surat_text"];
    var jumlahAyat = item["count_ayat"];
    var url = "surah.html?id="+idSurah;


    $("#AlquranList").append('<div class="col-md-3 p-3"><a href="'+url+'" class="w-100 text-decoration-none text-black d-flex px-2 py-3 justify-content-between align-items-center h-100 border rounded-3 boxListAlquran"><div class="d-flex h-100 align-items-center"><p class="pe-2 text-muted m-0 h-100 border-end">'+idSurah+'</p><div class="ms-3"><h6 class="m-0">'+namaSurah+'</h6><p class="m-0 text-muted" style="font-size: 14px;">'+terjemahan+' | '+jumlahAyat+'</p></div></div><h3 class="arabic m-0">'+suratArabic+'</h3></a></div>');
}