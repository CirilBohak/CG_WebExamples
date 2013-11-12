/****************************************************
 *
 *  preamble.js
 *  
 *  Implements the ability to provide a TeX preamble in the TeX block of
 *  your configuration.  The preamble can be used to perform macro
 *  definitions in TeX syntax.  For example
 *  
 *    MathJax.Hub.Config({
 *      TeX: {
 *        preamble:
 *          "\\def\\RR{\\mathbf{R}}" +
 *          "\\def\\CC{\\mathbf{C}}"
 *      }
 *    });
 *  
 *  or
 *  
 *    MathJax.Hub.Config({
 *      TeX: {
 *        preamble: [
 *          "\\def\\RR{\\mathbf{R}}",
 *          "\\def\\CC{\\mathbf{C}}",
 *          "\\def\\vector#1{\\left<#1\right>}",
 *        ]
 *      }
 *    });
 *  
 *  You can load it via the config=file parameter on the script
 *  tag that loads MathJax.js, or by including it in the extensions
 *  array in your configuration.
 *
 *  Be sure to change the loadComplete() address to the URL
 *  of the location of this file on your server. 
 */

MathJax.Extension["TeX/preamble"] = {
  version: "1.0",

  //
  //  Parse the TeX code (to perform the definitions), properly handling restarts
  //  for file loads.  If there is an error, report it.  If the preamble includes
  //  any output (which it shouldn't), then report that as a warning.
  //
  processPreamble: function (tex) {
    var mml;
    try {mml = MathJax.InputJax.TeX.Parse(tex).mml()} catch(err) {
      if (err.restart) {return MathJax.Callback.After(["processPreamble",this,tex],err.restart)}
      MathJax.Message.Set("Preamble Error: "+err.message.replace(/\n.*/,""),null,5000);
    }
    if (mml && mml.data && mml.data.length) {
      MathJax.Message.Set("WARNING: TeX preamble should not produce output.",null,5000);
    }
    return null;
  }
};

//
//  Register a startup hook that processes the preamble when 
//  the TeX input jax is loaded.
//
MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var tex = MathJax.InputJax.TeX.config.preamble;
  if (tex instanceof Array) {tex = tex.join("\n")}
  if (tex) {return MathJax.Extension["TeX/preamble"].processPreamble(tex)}
  return null;
});

MathJax.Ajax.loadComplete("http://cs.jsu.edu/mathjax-ext/github/preamble/preamble.js");

