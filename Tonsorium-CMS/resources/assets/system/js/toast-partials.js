import {translate} from "./translation-ajax";

export function error(msg = "Something went wrong.", transMsg = "何かがうまくいかなかった。"){
    $.toast({
        heading: translate('Error', 'エラー'),
        text: translate(msg, transMsg),
        showHideTransition: 'plain',
        icon: 'error',
        position: 'bottom-center'
    });
}

export function warning(msg = "Something went wrong.", transMsg = "何かがうまくいかなかった。"){
    $.toast({
        heading: translate('Warning', '警告'),
        text: translate(msg, transMsg),
        showHideTransition: 'plain',
        icon: 'warning',
        position: 'bottom-center'
    });
}

export function success(msg = "The update is complete.", transMsg="更新が完了しました。"){
    $.toast({
        heading: translate("Success", "成功"),
        text: translate(msg, transMsg),
        showHideTransition: 'plain',
        icon: 'success',
        position: 'bottom-center'
    });
}