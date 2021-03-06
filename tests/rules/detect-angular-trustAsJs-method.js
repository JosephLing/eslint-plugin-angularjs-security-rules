/**
 * @fileoverview Test for detect-angular-trustAs-methods
 * @author Lewis Ardern
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../lib/rules/detect-angular-trustAsJs-method");
var RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();

eslintTester.run("detect-angular-trustAsJs-method", rule, {
  valid: [
    { code: "$sce.trustAsJs('stringLiteral');" }, // string literals are OK
    { code: "$sce.ParseAsHtml()" },
    { code: "this.$sce.ParseAsHtml()" } // no need to look for valid as we are just doing detection 
  ],    
  invalid: [
    {
      code: "$sce.trustAsJs(value);",
      errors: [
        { message: "The use of $sce.trustAsJs can be dangerous" }
      ],
    },
    {
      code: "this.$sce.trustAsJs(value);",
      errors: [
        { message: "The use of $sce.trustAsJs can be dangerous" }
      ],
    }
  ]
}); 
