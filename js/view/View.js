function View() {
    // このオブジェクトへのリファレンス
    var self = this;

    // "Loading ..." 要素. app.css 内のスタイルを確認
    var msg;

    // 名前による HTML テンプレート
    var templates = {};

    // テキストファイルより HTML テンプレートをロードします。
    this.loadTemplates = function (file, callback) {
        file += "?" + (+new Date());

        // テキストファイルをロードします。("txt" ディレクトリを確認)
        $.get(file, function (text) {
            text = text.split("=====").splice(1);

            // テンプレートに名前を付け（splitさせる）分ける。
            for (var t in text) {
                var i = text[t].indexOf("\n");
                var key = text[t].substr(0, i).trim();
                var val = text[t].substr(i).trim();
                templates[key] = val;
            }

            // このビューのコンテキスト内にコールバック関数を呼ぶ
            callback(self);
        }, "html");
    };

    // 名前による HTML テンプレートを得る
    this.getTemplate = function (name) {
        return templates[name];
    };

    // "Loading ..." メッセージを表示させる. app.css内を確認しよう。
    this.showLoading = function () {
        if (!msg) {
            msg = document.createElement("div");
            msg.className = "loading";
            msg.innerHTML = "Loading ...";
            document.body.appendChild(msg);
        }

        msg.style.opacity = 1;
    };

    // "Loading ..." メッセージを隠します。
    this.hideLoading = function () {
        msg.style.opacity = 0;
    };

}
