import * as monaco from '@timkendrick/monaco-editor';
var monEditor;


function monacoEditor(editorOptions, possition) {
    monEditor = monaco.editor.create(document.getElementById('container'), editorOptions);
    // monEditor.onDidChangeModelContent(function (e) {
    //     editorValue = monEditor.getValue();
    // });
    monEditor.setPosition({
        column: 1,
        lineNumber: possition
    });
    return monEditor;
}


var editorOptions = {};
export default {
    name: "CodeEditor",
    props: {
        code: Object,
        language: String,
        dark: Boolean,
    },
    data() {
        return {
            editor: "",
        };
    },
    mounted() {
        window.MonacoEnvironment = {
            baseUrl: 'node_modules/@timkendrick/monaco-editor/dist/external',
        };
        document.getElementById('mainFrame').style.display = 'block';
        editorOptions = {
            value: JSON.stringify(this.code, null, 4),
            language: this.language,
            folding: true,
            theme: this.dark ? 'vs-dark' : 'vs',
            colors: {
                'editor.lineHighlightBackground': 'red',
                'editor.selectionHighlightBackground': "red"
            }
        };

        this.editor = monacoEditor(editorOptions, 1);
    },
    methods: {
        goToLine(lineIndex) {

            monEditor.setPosition({
                column: 1,
                lineNumber: lineIndex
            })
            monEditor.revealLineInCenter(lineIndex)

            monEditor.focus();
        },
        getEditorValue() {
            try{
                JSON.parse(monEditor.getValue())
            }catch(e){
                return e
            }
            return JSON.parse(monEditor.getValue())
        }
    },

}
