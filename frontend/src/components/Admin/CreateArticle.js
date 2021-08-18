import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/draggable.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/file.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/image_manager.min.js";
import "froala-editor/js/third_party/image_tui.min.js";
import "froala-editor/js/plugins/inline_class.min.js";
import "froala-editor/js/plugins/line_breaker.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/print.min.js";
import "froala-editor/js/plugins/quick_insert.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/url.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/word_paste.min.js";
import { createArticle } from "../../actions/articleActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import Loader from "../Loader";
const idForImages = Date.now();
class CreateArticle extends Component {
  config = {
    placeholderText: "Edit Your Content Here!",
    charCounterCount: false,
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "fontFamily",
          "fontSize",
          "textColor",
          "backgroundColor",
          "inlineClass",
          "inlineStyle",
          "clearFormatting",
        ],
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "formatOLSimple",
          "alignRight",
          "alignJustify",
          "formatOL",
          "formatUL",
          "paragraphFormat",
          "paragraphStyle",
          "lineHeight",
          "outdent",
          "indent",
          "quote",
        ],
      },
      moreRich: {
        buttons: [
          "insertLink",
          "insertImage",
          "insertVideo",
          "insertTable",
          "emoticons",
          "fontAwesome",
          "specialCharacters",
          "embedly",
          "insertFile",
          "insertHR",
        ],
      },
      moreMisc: {
        buttons: [
          "undo",
          "redo",
          "fullscreen",
          "print",
          "getPDF",
          "spellChecker",
          "selectAll",
          "html",
          "help",
        ],
        align: "right",
        buttonsVisible: 2,
      },
    },
    // Set the image upload parameter.
    imageUploadParam: "articleImage",

    // Set the image upload URL.
    imageUploadURL: `/api/v1/admin/article/images/upload/${
      store.getState().auth.user._id
    }`,
    // imageRemoveURL: `/api/v1/admin/article/images/delete/${store.getState().auth.user._id}`,

    // Additional upload params.
    imageUploadParams: {
      idForImages: idForImages,
    },
    // Set request type.
    imageUploadMethod: "POST",

    // Set max image size to 5MB.
    imageMaxSize: 5 * 1024 * 1024,

    // Allow to upload PNG and JPG.
    imageAllowedTypes: ["jpeg", "jpg", "png"],

    events: {
      "image.beforeUpload": async function (images) {
        // Return false if you want to stop the image upload.
      },
      "image.uploaded": function (response) {
        toast.success("Image Uploaded Successfully!");
      },
      "image.inserted": function ($img, response) {
        // Image was inserted in the editor.
        // console.log($img,response)
      },
      "image.removed": function ($img) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          // Image was removed.
          if (this.readyState === 4 && this.status === 200) {
            toast.success("Image Deleted Successfully!");
          }
        };
        xhttp.open(
          "POST",
          `/api/v1/admin/article/images/delete/${
            store.getState().auth.user._id
          }`,
          true
        );
        xhttp.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        xhttp.send(
          JSON.stringify({
            src: $img[0].currentSrc,
          })
        );
      },
      "image.replaced": function ($img, response) {
        // Image was replaced in the editor.
      },
      "image.error": function (error, response) {
        // Bad link.
        if (error.code === 1) {
        }

        // No link in upload response.
        else if (error.code === 2) {
        }

        // Error during image upload.
        else if (error.code === 3) {
        }

        // Parsing response failed.
        else if (error.code === 4) {
        }

        // Image too text-large.
        else if (error.code === 5) {
        }

        // Invalid image type.
        else if (error.code === 6) {
        }

        // Image can be uploaded only to same domain in IE 8 and IE 9.
        else if (error.code === 7) {
        }

        // Response contains the original server response to the request if available.
      },
    },
  };
  formData = new FormData();
  constructor(props) {
    super(props);
    this.state = {
      articleCreated: false,
      article: {},
      loading: true,
    };
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  hoverHandler(e) {
    e.target.style.border = "3px solid rgba(0,0,0,0.5)";
    e.target.style.opacity = "0.4";
    e.target.style.transition = "opacity 2s, border 2s";
  }
  hoverAwayHandler(e) {
    e.target.style.border = "4px solid rgba(0,0,0,0.3)";
    e.target.style.opacity = "1";
    e.target.style.transition = "opacity 2s, border 2s";
  }
  changeArticleCoverHandler(e) {
    //
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        document
          .getElementById("coverForArticle")
          .setAttribute("src", reader.result);
        // store.dispatch(avatarChange(store.getState().auth.user._id,formData)).then((data)=>{
        //     if(data.success === true){
        //         toast.success(data.message)
        //     }else {
        //         toast.error(data.message)
        //     }
        // }).catch(err => toast.error(err.message))
      }
    };
    this.formData.set("articleCover", e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    // console.log(e.target.files[0])
    // const objectURL = URL.createObjectURL(e.target.files[0])
  }
  submitHandler(e) {
    e.preventDefault();
    if (document.getElementById("articleHeadline").value === "") {
      toast.error("أدخل عنوان المقالة");
    } else if (document.getElementById("articleIntro").value === "") {
      toast.error("أدخل مقدمه المقالة");
    } else if (
      document.getElementsByClassName("fr-element fr-view")[0].innerHTML ===
      "<p><br></p>"
    ) {
      toast.error("المقالة لا يمكن ان تكون فارغة");
    } else if (!this.formData.get("articleCover")) {
      toast.error("اختار صوره للمقالة");
    } else {
      document.getElementById("loader").style.display = "block";
      this.formData.set(
        "articleHeadline",
        document.getElementById("articleHeadline").value
      );
      this.formData.set(
        "articleIntro",
        document.getElementById("articleIntro").value
      );
      this.formData.set(
        "articleHTML",
        document.getElementsByClassName("fr-element fr-view")[0].innerHTML
      );
      this.formData.set("user", store.getState().auth.user._id);
      this.formData.set("idForImages", idForImages);
      store
        .dispatch(createArticle(this.formData))
        .then((data) => {
          if (data.success === true) {
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            this.setState({ articleCreated: true, article: data.article });
          } else {
            document.getElementById("loader").style.display = "none";
            toast.error(data.message);
          }
        })
        .catch((err) => toast.error(err.message));
    }
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={"إنشاء مقالة جديدة"}
          description="الموقع الرسمي للأستاذ اتدكتور صلاح الجوهري أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب طنطا
             و استشاري الجراحة العامة و جراحات المناظير"
          image={
            "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
          }
          url={window.location.href}
        />
        {"_id" in store.getState().auth.user ? (
          store.getState().auth.user.role !== "admin" ? (
            <Redirect to="/"></Redirect>
          ) : (
            ""
          )
        ) : (
          <Redirect to="/"></Redirect>
        )}
        {this.state.articleCreated ? (
          <Redirect to={`/article/${this.state.article._id}`}></Redirect>
        ) : (
          ""
        )}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="row animate__animated animate__fadeIn animate__slower">
              <div className="col-12 col-lg-10 background-class mx-auto animate__animated animate__fadeIn  animate__delay-1s">
                <h1 style={{ textAlign: "right" }}>إنشاء مقاله جديده</h1>
                <br></br>
                <div className="row">
                  <div className="col-12">
                    {/* (change)="onCoverSelected($event)" */}
                    <img
                      id="coverForArticle"
                      className="img-fluid d-block mx-auto"
                      onClick={(e) =>
                        document.getElementById("articleCover").click()
                      }
                      src="https://etak-start.s3.eu-west-3.amazonaws.com/media/default_cover.png"
                      alt="article cover"
                      onMouseEnter={this.hoverHandler}
                      onMouseLeave={this.hoverAwayHandler}
                    />
                    <input
                      onChange={(e) => this.changeArticleCoverHandler(e)}
                      type="file"
                      id="articleCover"
                      name="articleCover"
                      accept="image/*"
                      style={{ visibility: "hidden" }}
                      required
                    />
                    {/* <a className="btn btn-secondary change-cover-btn"  (click)="onClickChangeArticleCover()" type="button">Change Cover</a> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <input
                      id="articleHeadline"
                      type="text"
                      className="form-control"
                      placeholder="عنوان المقاله"
                      required
                    />
                    <br></br>
                    <textarea
                      id="articleIntro"
                      type="text"
                      className="form-control"
                      placeholder="مقدمه المقاله"
                      required
                    ></textarea>
                    <br></br>
                    {/* <select id="articleCategory" className="form-control" aria-label="Default select example">
                  <option selected disabled>Category</option>
                  <option value="General">General</option>
                  <option value="Know Your Content Creator">Know Your Content Creator</option>
                </select>
                <br></br> */}
                    <FroalaEditor
                      tag="textarea"
                      config={this.config}
                      // model={this.state.model}
                      // onModelChange={this.handleModelChange}
                    />
                  </div>
                </div>
                <br></br>
                <div className="form-group col-12">
                  <button
                    type="button"
                    onClick={(e) => this.submitHandler(e)}
                    className="btn btn-outline-primary d-block mx-auto"
                    style={{ borderRadius: "50px", padding: "10px 30px" }}
                  >
                    إنشاء
                  </button>
                  <br></br>
                  <div id="loader" style={{ display: "none" }}>
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}

        <br></br>
      </Fragment>
    );
  }
}
export default CreateArticle;
