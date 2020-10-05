import React, { Component } from 'react'
import { Editor } from "@tinymce/tinymce-react";

export class EditorArea extends Component{

    changeBody = e => {
        this.props.changeParentBody(e)
    }

    render(){
        return(
            <div className="form-group">
                <label htmlFor="body-input">Сообщение</label>
                <Editor
                value={this.props.value}
                init={{
                    height: 400,
                    // plugins: [
                    //   "advlist autolink lists link charmap print preview anchor",
                    //   "searchreplace visualblocks code",
                    //   "insertdatetime table paste code help wordcount",
                    // ],
                    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                    menubar: 'file edit view insert format tools table help',
                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                    // toolbar_sticky: true,
                    style_formats: [
                    { title: 'button', inline: 'button', class: "more-link" }
                    ],
                    // toolbar:
                    //   "undo redo | formatselect | bold italic backcolor |alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | table insertfile image link media mediaembed pageembed | preview help",
                }}
                onEditorChange={this.changeBody}
                id="body-input"
                />
            </div>
        )
    }
}