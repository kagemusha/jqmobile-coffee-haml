## Intro

This project is a collection of utilities to make it easier to write jQuery Mobile templates using coffeescript and haml.  It grew out of a Phonegap-jQuery Mobile app.  I was using JQuery templates previously but don't like having to use html (because of phonegap) and had some problems when dynamic page logic got complicated.  On the other hand, generating pages with Javascript makes it very difficult to see what's going on -- unless you use Coffeescript here documents…

An example.  To write something like:

<div data-theme="e" data-role="page" id="hotelsPage">
	<div data-role="header" data-position="inline">
		<h1>Hotels</h1>
	</div>
	<div data-role="content">
		<ul id="hotelList" data-role="listview"></ul>
	</div>
</div>

You would write a here document such as
	"""
   	#{page "#{pgData.pageId}", PG_DEFAULTS}
    	#{pageHeader "Hotels"}
    	#{content() }
	   		#{listview {id: "hotelList" } }
	"""

page(), pageHeader() and content() are template elements in jqm-haml.coffee

This gets wrapped in a template function which converts the haml to html using hamlHtml():

	hotelsPageTmpl = (pgData)->
	  hamlHtml  """
    	#{page "#{pgData.pageId}", PG_DEFAULTS}
	      #{pageHeader "Hotels"}
    	  #{content() }
	        #{listview {id: "hotelList" } }
    	"""

Where you want to generate this page (generally at app startup), you use appendTmpl() (see templating.coffee):

	initApp = ->
		… 
		appendTmpl "body", "hotelsPageTmpl", pageData
		… 

Your html becomes very simple.  Something like:

<!DOCTYPE HTML>
<html>
    <head>
       <meta …>
       <title>… </title>
		…css links…
		…javascript includes…
    </head>
<body>
    <script>
        initApp()
    </script>
</body>

See the example app to see the whole thing in action.

You can use haml-util and templating separately for a haml templating solution independent of jquery.

In addition jqm-util has some useful jquery mobile utilities not dependent of the rest of the library.


## When to Use
1. you want to use haml and your environment doesn't support it (but does support javascript)
2. you benefit from having your templates within javascript (can use with node.js for example)
3. you don't have access to other template solutions like rails erb

## Some other Benefits

1. everything is in javascript so can be easier to manipulate/do complex logic than other templating solutions. also you can specify constants for both your design elements and logic

2. Html templates can make it difficult to embed design element because of closing tags.  For instance if you want to have a resuable page template to build the example page, you typically need to do something like this:

pageTmpl = (pageData, header, content) ->
	<div data-role="page" id="#{pageData.id}">
		#{header}
		#{content}
	</div>

which requires you build and generate separate header and content templates for each page.  This is alot messier than the haml solution, which lets you reuse but still groups pages together.


## Installation

Download and include the jqm-haml.js file from your html doc:

	<script src="js/jqm-haml.js"></script>

Or build and include files separately.


## Building

Use the build command to combine all the .coffee files into one js file.  Or build individual files using coffeescript's coffee command.

## Coffeescript here documents

Coffeescript here documents make it easy to write multiline strings like html pages. Here documents are delimited by """.  Variables can be embedded using #{variable}, making it easy to write dynamic docs.  For example a div containing a dynamically assigned name:

nameDiv = (name)->
  """
    <div id="myName">
      #{name}
    </div>
  """

Coffee generates the following javascript string:

nameDiv = function(name) {
  return "<div id=\"myName\">\n  " + name + "\n</div>";
};



## Tasks

Building html pages/elements:

	Generally you will template function with a here document.  Complex dynamic logic is probably better done outside the here document.  hamlHtml() converts the haml to html.  Alternatively, you can have your template return haml and convert it manually, e.g. hamlHtml(myPageTmpl(…))

	myPageTmpl = (pgData)->
	  #dynamic logic here
	  hamlHtml """
		…design elements...
	  """

	See introduction for more.

Adding element to your html doc:

	Use appendTmpl(containers, templateFn, data, options) in templates.coffee (see introduction)

	If data is an array, an html element will be generated for each array element, useful when building lists or tables.


Refreshing elements:

	Use the following functions in templates.coffee:

		refreshTmplById(id, templateFn, data, options)
		refreshTmpl(containers, templateFn, data, options)

	These first empty specified container(s) then append the html generated by templateFn




## Building Widgets 

Building widgets is similar to building pages but you will generally return haml and let the widget container run hamlHtml().

There is also one caveat with multiline widgets.  Since the here document only will indent the first line, the following:

	"""
	%div
		#{myMultilineWidget}
	"""
	
	will produce:
	
	%div
		widgetLine1
	widgetLine2

	To correct this, use multilineHaml() (in haml-util.coffee) in your widget template, e.g.:

	  yesnoChoiceTmpl = (label, fieldName, yesChecked=false, cgOptions={}) ->
		…
	    haml = """
    	#{controlgroup label, cgOptions}
	        #{ radio "Yes", fieldName, "yes", "true", {}, yesChecked }
    	    #{ radio "No", fieldName, "no", "false", {}, !yesChecked }
	    """
	    multilineHaml haml

	
## Files

haml-util.coffee: basic functionality for using haml and haml components.  Depends on haml.js
jqm-haml.coffee: basic wrappers for jqmobile elements such as pages, headers, listviews. Depends on haml-util.js, jquery.mobile-xx.js, underscore.js
jqm-haml-widgets.coffee: some higher-level widgets. Depends on jqm-haml.js
jqm-util.coffee: some useful jquerymobile utilities such as page refresh.  Depends on jquery.mobile-xx.js.
templating.coffee: basic templates mechanism.  Depends on jquery.js
debug.js: debuggins utilities.  Depends on library including JSON.stringify 

## To do

	jqm-haml.coffee is far from complete.  I encourage people to add wrappers for common jquerymobile design elements.  Also welcome more higher-level widgets.
	
	I haven't namespaced.  Encourage suggestions.