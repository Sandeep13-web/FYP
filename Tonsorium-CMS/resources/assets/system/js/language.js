import {error, success} from "./toast-partials";

$(function () {

    $(".tr_clone_add").on('click', function () {
        let $tr = $(this).closest('.tr_clone');
        let c = $tr.clone();
        c.find(".tr_clone_add").remove();
        let selectModule = c.find(".selectModule").clone().removeAttr('data-select2-id').removeAttr('tabindex').removeAttr('aria-hidden').removeClass().addClass('select22 page-value');
        c.find(".selectModule").remove();
        c.find(".select2-container").remove();
        c.find(".page__value").append(selectModule);
        c.find(".tr-plus").append("<td><span class='fa fa-minus rmv cursor-pointer' style='position: inherit;margin-left: 17px;'></span></td>")
        c.find(".data-delete").remove();
        c.find(".sn").text('');
        c.find(".translation-id-val").val('');
        c.find(".translation-content");
        c.addClass('selected');
        $tr.after(c);

        $('.select22').select2({
            width: '100%',
        });
    });
    $('#translationsTbl').on('click', '.rmv', function () {
        $(this).closest('tr').remove();
    });
    
    $('body').on('click', '.update-language', function () {
        let selectEle = $(this);
        let $tr = selectEle.closest('.tr_clone');
        let word = $tr.find('td:eq(2)').text();
        let transId = $tr.find('.translation-id-val').val();
        let trans = $tr.find('.translation-content').val();
        let page = $tr.find('.page-value').val();


        let url = '/languages/update';

        $.ajax({
            url,
            type: 'post',
            data: {
                _id: transId,
                word: word,
                translation: trans,
                group: 'backend',
                language: 'ja',
                page_url: page
            },
            success: () => {
                success();
                // setTimeout(function(){  window.location.reload(true) }, 2000);
            },
            error: (e) => {
                error();
            }
        });


        if (selectEle[0] && selectEle[0].classList.contains('page-value')) {

            let page_url = $(this).val();

        }
    });
});