import { Component, OnDestroy, AfterViewInit, EventEmitter, Input, Output, ViewChild, OnChanges, OnInit } from '@angular/core';


@Component({
  selector: 'app-simple-tiny',
  templateUrl: './simple-tiny.component.html',
  styleUrls: ['./simple-tiny.component.css']
})
export class SimpleTinyComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() elementId: String;
  @Output() onEditorKeyup: EventEmitter<any> = new EventEmitter<any>();
  @Input() content: string;
  
  editor;
  
  constructor() {
  }
  ngOnInit(){

  }
  ngAfterViewInit() {
    tinymce.baseURL = "/assets/tinymce";
    tinymce.init({

      selector: '#' + this.elementId,
      language: 'vi_VN',
      skin_url: '/assets/tinymce/skins/lightgray',
      language_url: '/assets/tinymce/langs/vi_VN.js',
      paste_data_images: true,
      fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
      plugins: "autosave autolink code codesample colorpicker emoticons fullscreen hr image code imagetools media preview table textcolor wordcount",
      toolbar: "imageupload  forecolor cut copy paste fontselect  fontsizeselect bold italic bold link preview code image ", 
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
        editor.on('init', () => {
          editor.setContent(this.content,{format : 'raw'});
        });
      }, 
           
    })
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}