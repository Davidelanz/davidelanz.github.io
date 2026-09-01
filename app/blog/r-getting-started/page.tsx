import type { Metadata } from "next";
import { ArticlePage } from "@/components/ArticlePage";
import { definePostMetadata } from "../post-metadata";

export const metadata: Metadata = definePostMetadata({
  title: "Getting started with R and RStudio",
  description: "R and RStudio setup via docker. R programming language fundamentals.",
  date: "2022-01-02",
  tags: ["R", "RStudio", "Docker"],
});

export default function Page() {
  return (
    <ArticlePage
      title={metadata.title as string}
      description={metadata.description as string}
      date={metadata.other?.date as string}
      tags={metadata.other?.tags as string[]}
    >
      <>
        <p>
          <a href="https://www.r-project.org/">R</a> is a programming language for statistical
          computing and graphics supported by the R Core Team and the R Foundation for Statistical
          Computing. Created by statisticians Ross Ihaka and Robert Gentleman, R is used among data
          miners and statisticians for developing statistical software and data analysis.
        </p>
        <p>
          <a href="https://www.rstudio.com/">RStudio</a> provides free and open-source tools for R
          and enterprise-ready professional software for data science teams to develop and share
          their work.
        </p>
        <p>
          Here, we show how to set up RStudio server via a Docker image on a local machine. Then, we
          run some basic commands to learn the R fundamentals.
        </p>
        <h2 id="contents"> Contents </h2>
        <ul>
          <li>
            <a href="#why-r">Why R?</a>
          </li>
          <li>
            <a href="#setting-up-r-and-rstudio-via-docker">Setting up R and RStudio via Docker</a>
          </li>
          <li>
            <a href="#rstudio-interface-and-markdown-scripts">
              RStudio Interface and Markdown Scripts
            </a>
          </li>
          <li>
            <a href="#basic-syntax-and-hotkeys">Basic Syntax and Hotkeys</a>
          </li>
          <li>
            <a href="#data-types-and-r-objects">Data Types and R objects</a>
            <ul>
              <li>
                <a href="#vector">Vector</a>
              </li>
              <li>
                <a href="#lists">Lists</a>
              </li>
              <li>
                <a href="#matrices">Matrices</a>
              </li>
              <li>
                <a href="#arrays">Arrays</a>
              </li>
              <li>
                <a href="#factors">Factors</a>
              </li>
              <li>
                <a href="#data-frames">Data Frames</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#manage-data-in-r-tidyverse">Manage Data in R: tidyverse</a>
            <ul>
              <li>
                <a href="#the-dplyr-package">The dplyr Package</a>
              </li>
              <li>
                <a href="#-and-pipe-operators">%…% and Pipe Operators</a>
              </li>
              <li>
                <a href="#clean-and-re-shape-with-dplyr">Clean and Re-shape with dplyr</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#plot-your-data-ggplot">Plot Your Data: ggplot</a>
          </li>
          <li>
            <a href="#examples-of-eda-exploratory-data-analysis">
              Examples of EDA (Exploratory Data Analysis)
            </a>
          </li>
          <li>
            <a href="#import-data-from-your-files-readr">Import Data from Your Files: readr</a>
          </li>
          <li>
            <a href="#bonus-useful-packages">Bonus: Useful Packages</a>
            <ul>
              <li>
                <a href="#datapasta">datapasta</a>
              </li>
              <li>
                <a href="#esquisse">esquisse</a>
              </li>
              <li>
                <a href="#rayshader">rayshader</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#resources">Resources</a>
          </li>
        </ul>
        <h2>Why R?</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          R can be used for a lot of different things. It’s widely used in{" "}
          <strong>data science</strong> and <strong>statistical research</strong>. With R, you can
          create a variety of different types of documents, reports, or any sort of analysis with R
          and its various packages and useful utilities. You can also create dashboards with various
          packages like the <a href="https://shiny.rstudio.com/">shiny</a> package, and it’s widely
          used in academia for research.
        </p>
        <p>
          R is an <strong>incredibly popular</strong> language (check its positioning on the{" "}
          <a href="https://www.tiobe.com/tiobe-index/">TIOBE index</a>), but why? Despite the fact
          that it is a very specialized language for statistical analysis, data science, and
          academia, it is highly rated and broadly adopted. Python is definitely a popular language
          for data science and academia, but R definitely has its place as a specialized language
          that works in a lot of areas, whereas python is more of a general-purpose language.
        </p>
        <p>
          R was created in 1993 as an implementation of the{" "}
          <a href="https://en.wikipedia.org/wiki/S_(programming_language)">S language</a> made at
          Bell labs in 1976. That’s the reason why R is a <strong>mature</strong> language and why
          it is <strong>conservatively maintained</strong>. The base package of R is very rarely
          changed, and updates are usually backward compatible. So, changes to R rarely will break:
          if you can use some 20-years-old R code, it will probably still run! R has an amazing
          wealth of code that’s already been written and used for decades. Moreover R graphics using
          the{" "}
          <a href="https://ggplot2.tidyverse.org/">
            <code>ggplot2</code>
          </a>{" "}
          package are used in modern journalism or scientific literature for a lot of the
          infographics and visualizations. The con of such a strong legacy is that, since R is a
          very old language, it contains a lot of quirks, weird history, and things that have been
          left around.
        </p>
        <p>
          R is <strong>highly extensible</strong> with its{" "}
          <a href="https://cran.r-project.org/">package system</a>. There are an incalculable number
          of packages, and more are being made every single day.
        </p>
        <p>
          R is a <strong>vectorized language</strong>. Hence, even single values are just vectors of
          size one. This gives you great power over what you can get out of these vectors, and it’s
          easy to perform analysis and bulk operations.
        </p>
        <p>
          R is really interesting because it does have elements of both{" "}
          <strong>object-oriented</strong> and <strong>functional programming</strong>.
        </p>
        <p>
          R is great as an interface or an <strong>intermediary language</strong> between other
          languages. There are a lot of other languages can integrate in R working closely with it,
          either reproducible analyses, creating a good-looking documents, or just improving speed.
          Since R is <strong>single threaded</strong>, for example, we can boost its calculation
          speed with some C++ code. R works well with latex and markdown as well, and with{" "}
          <a href="https://pandoc.org/">pandoc</a> you can create really great documents. Javascript
          libraries come into play when you export R code to HTML documents, and so on…
        </p>
        <h2>Setting up R and RStudio via Docker</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          The <a href="https://www.rocker-project.org/">Rocker Project</a> is a great open-source
          project, and it allows us to easily set up our R development environment. If we have{" "}
          <a href="https://docs.docker.com/installation/">Docker</a> installed, we can start R
          inside a container just with:
        </p>
        <pre>
          <code>docker run --rm -ti rocker/r-base</code>
        </pre>
        <p>If we want instead to get started with an RStudio® instance, we need to execute:</p>
        <pre>
          <code>docker run -e PASSWORD=yourpassword --rm -p 8787:8787 rocker/rstudio</code>
        </pre>
        <p>
          Then, we go at <a href="localhost:8787">localhost:8787</a> and log in using user/password{" "}
          <code>rstudio</code>/<code>yourpassword</code>.
        </p>
        <blockquote>
          <p>
            If a password is not provided, a randomly generated password will be given in the docker
            log for the container. Check the terminal output or use <code>docker logs</code> command
            to check.
          </p>
        </blockquote>
        <h2>RStudio Interface and Markdown Scripts</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          After we go at <a href="localhost:8787">localhost:8787</a> we find ourself in the RStudio
          web interface. The following windows will appear as part of it:
        </p>
        <ul>
          <li>
            <strong>Console window</strong>: it is the standard R console window (the only one you
            would see if you used only R and not R via RStudio. This is the window where you type in
            commands and the results are returned.
          </li>
          <li>
            <strong>Workspace / History</strong>: it shows all the objects that you have created in
            the current R session (Workspace tab) and the commands you have used in the current R
            session (History tab).
          </li>
          <li>
            <strong>Files / Plots / Packages / Help</strong>: it is primarily used for displaying
            plots (graphs) and for using the help system.
          </li>
        </ul>
        <p>
          R is a <strong>command driven program</strong>, which means that you type in code to the
          Console window and it returns the result. You can either type code directly into the
          Console window, or you can type it into a <strong>script file</strong>, and then run the
          code you have written in the Console window. To create a text file to write your code in
          select <code>File -&gt; New File -&gt; R Script</code>. Then, the RStudio user-interface
          will open:
        </p>
        <ul>
          <li>
            <strong>Script window</strong>: it allows you to write R code into the script file.
          </li>
        </ul>
        <p>
          A useful RStudio feature is to use{" "}
          <a href="https://www.rstudio.com/wp-content/uploads/2015/02/rmarkdown-cheatsheet.pdf">
            Markdown scripts
          </a>{" "}
          (<code>.Rmd</code> extension), that are basically markdown documents with R code embedded
          in blocks:
        </p>
        <pre>
          --- title: "Hello R Markdown" author: "Awesome Me" date: "2018-02-14" output:
          html_document --- This is a paragraph in an R Markdown document. Below is a code chunk:
          ```&#123;r&#125; fit = lm(dist ~ speed, data = cars) b = coef(fit) plot(cars) abline(fit)
          ``` The slope of the regression is `r b[1]`.
        </pre>
        <h2>Basic Syntax and Hotkeys</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          A comprehensive list of RStudio hotkeys is available directly in the RStudio IDE under the
          Tools menu: <code>Tools -&gt; Keyboard Shortcuts Help</code>. The most common are:
        </p>
        <ul>
          <li>
            <code>ctrl-enter</code> execute selected lines / whole chunk
          </li>
          <li>
            <code>ctrl-shift-C</code>: comment selected lines
          </li>
          <li>
            <code>ctrl-L</code>: clear console log
          </li>
        </ul>
        <p>An example code chuck is the following one:</p>
        <pre>
          <code className="language-r">
            7 # this number will be displayed x &lt;- 1 # 1 will be assigned to x 2 -&gt; y #
            assignment can work the other way around as well z = x + y # equal can be used as well
            for value assignment
          </code>
        </pre>
        <p>When the chunk is ran, the output displayed on the console is:</p>
        <pre>
          <code>[1] 7</code>
        </pre>
        <h2>Data Types and R objects</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          In contrast to other programming languages like C and Java, in R the variables are not
          declared as some data type. The variables are assigned with R-Objects and the data type of
          the <strong>R-object</strong> becomes the data type of the variable. There are 6 types of
          objects in R Programming:
        </p>
        <ul>
          <li>Vectors</li>
          <li>Lists</li>
          <li>Matrices</li>
          <li>Arrays</li>
          <li>Factors</li>
          <li>Data Frames</li>
        </ul>
        <h3>Vector</h3>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Vectors are one of the basic R programming data objects. Everything’s a vector. If you
          just assign a single value, it’s a vector of length one. They are six types of atomic
          vectors:
        </p>
        <ul>
          <li>
            <code>logical</code>
          </li>
          <li>
            <code>integer</code>
          </li>
          <li>
            <code>character</code>
          </li>
          <li>
            <code>raw</code>
          </li>
          <li>
            <code>double</code>
          </li>
          <li>
            <code>complex</code>
          </li>
        </ul>
        <p>Code:</p>
        <pre>
          <code className="language-r">
            # Logical TRUE, FALSE v &lt;- TRUE print(class(v)) # Numeric 12.3, 5, 999 v &lt;- 23.5
            print(class(v)) # Integer 2L, 34L, 0L v &lt;- 2L print(class(v)) # Complex 3 + 2i v
            &lt;- 2+5i print(class(v)) # Character 'a', '&quot;good&quot;, &quot;TRUE&quot;, '23.4'
            v &lt;- &quot;TRUE&quot; print(class(v)) # Raw &quot;Hello&quot; is stored as 48 65 6c
            6c 6f v &lt;- charToRaw(&quot;Hello&quot;) print(class(v)) v
          </code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>
            [1] &quot;logical&quot; [1] &quot;numeric&quot; [1] &quot;integer&quot; [1]
            &quot;complex&quot; [1] &quot;character&quot; [1] &quot;raw&quot; [1] 48 65 6c 6c 6f
          </code>
        </pre>
        <p>
          <code>c()</code> is a generic function which combines its arguments. The default method
          combines its arguments to form a vector. All arguments are coerced to a common type which
          is the type of the returned value, and all attributes except names are removed.
        </p>
        <p>Code:</p>
        <pre>
          <code className="language-r">
            # Create a vector. apple &lt;- c('red','green',&quot;yellow&quot;) print(apple) # Get
            the class of the vector. print(class(apple))
          </code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>
            [1] &quot;red&quot; &quot;green&quot; &quot;yellow&quot; [1] &quot;character&quot;
          </code>
        </pre>
        <h3>Lists</h3>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Lists are data objects of R that contain various types of elements including strings,
          numbers, vectors, and a nested list inside it. It can also consist of matrices or
          functions as elements. It can be created with the help of the <code>list()</code>{" "}
          function.
        </p>
        <p>Code:</p>
        <pre>
          <code className="language-r">
            # Create a list. list1 &lt;- list(c(2,5,3),21.3,sin, TRUE) # Print the list.
            print(list1)
          </code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>
            [[1]] [1] 2 5 3 [[2]] [1] 21.3 [[3]] function (x) .Primitive(&quot;sin&quot;) [[4]] [1]
            TRUE
          </code>
        </pre>
        <h3>Matrices</h3>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Matrices in R Programming are used to arrange elements in the two-dimensional layout. They
          contain elements of the same data type. They usually contain numeric values in order to
          perform mathematical operations.
        </p>
        <p>Code:</p>
        <pre>
          <code className="language-r">
            # Create a matrix. M = matrix( c('a','a','b','c','b','a'), nrow = 2, ncol = 3, byrow =
            TRUE) print(M)
          </code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>
            {" "}
            [,1] [,2] [,3] [1,] &quot;a&quot; &quot;a&quot; &quot;b&quot; [2,] &quot;c&quot;
            &quot;b&quot; &quot;a&quot;
          </code>
        </pre>
        <h3>Arrays</h3>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          An array is used to store data in more than just 2 dimensions. It is used to store
          multi-dimensional data in the required format. It can be created with the help of an{" "}
          <code>array()</code> function.
        </p>
        <p>Code:</p>
        <pre>
          <code className="language-r">
            # Create an array. a &lt;- array(c('green','yellow'),dim = c(3,3,2)) print(a)
          </code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>
            , , 1 [,1] [,2] [,3] [1,] &quot;green&quot; &quot;yellow&quot; &quot;green&quot; [2,]
            &quot;yellow&quot; &quot;green&quot; &quot;yellow&quot; [3,] &quot;green&quot;
            &quot;yellow&quot; &quot;green&quot; , , 2 [,1] [,2] [,3] [1,] &quot;yellow&quot;
            &quot;green&quot; &quot;yellow&quot; [2,] &quot;green&quot; &quot;yellow&quot;
            &quot;green&quot; [3,] &quot;yellow&quot; &quot;green&quot; &quot;yellow&quot;
          </code>
        </pre>
        <blockquote>
          <p>
            ⚠️ <strong>R Vector Recycling</strong> is a process in which two vectors are involved in
            an operation, that operation needs the vectors to be of same length, and R repeats the
            elements of shorter vector to match the length of longer vector.
          </p>
          <p>
            This happens as well for <code>array()</code> functon. If you create - for example - an
            array from a vector of two values <code>c(&quot;green&quot;, &quot;yellow&quot;)</code>{" "}
            and you set the array dimensions to <code>dim=(5)</code> R recycles the vector values in
            order to fill up the array:{" "}
            <code>
              [1] &quot;green&quot; &quot;yellow&quot; &quot;green&quot; &quot;yellow&quot;
              &quot;green&quot;{" "}
            </code>
          </p>
          <p>
            If you have a vector that’s too short, then, R will start repeating its values. If you
            want to avoid this behavior, you need to pay close attention to the length of your
            vectors and what you’re doing with them!
          </p>
        </blockquote>
        <h3>Factors</h3>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Factors are the r-objects which are created using a vector. It stores the vector along
          with the distinct values of the elements in the vector as labels. The labels are always
          character irrespective of whether it is numeric or character or Boolean etc. in the input
          vector. They are useful in statistical modeling.
        </p>
        <p>
          Factors are created using the <code>factor()</code> function. The <code>nlevels</code>{" "}
          functions gives the count of levels.
        </p>
        <p>Code:</p>
        <pre>
          <code className="language-r">
            # Create a vector. apple_colors &lt;-
            c('green','green','yellow','red','red','red','green') # Create a factor object.
            factor_apple &lt;- factor(apple_colors) # Print the factor. print(factor_apple)
            print(nlevels(factor_apple))
          </code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>[1] green green yellow red red red green Levels: green red yellow [1] 3</code>
        </pre>
        <h3>Data Frames</h3>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Data frames are tabular data objects. Unlike a matrix in data frame each column can
          contain different modes of data (e.g. the first column can be numeric while the second
          column can be character and third column can be logical). A data frame is basically is a
          list of vectors of equal length.
        </p>
        <p>
          Data Frames are created using the <code>data.frame()</code> function, and all the columns
          need to contain the same number of rows (hence, be careful about vector recycling).
        </p>
        <p>Code:</p>
        <pre>
          <code className="language-r">
            # Create the data frame. BMI &lt;- data.frame( name = c(&quot;John&quot;,
            &quot;Jill&quot;,&quot;Mark&quot;), gender = factor(c(&quot;Male&quot;,
            &quot;Male&quot;,&quot;Female&quot;)), height = c(152, 171.5, 165), weight = c(81,93,
            78), Age = c(42,38,26) ) print(BMI)
          </code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>
            {" "}
            name gender height weight Age 1 John Male 152.0 81 42 2 Jill Male 171.5 93 38 3 Mark
            Female 165.0 78 26
          </code>
        </pre>
        <h2>Manage Data in R: tidyverse</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <blockquote>
          <p>
            There is actually a lot of debate if one should actually learn how to use the tidyverse
            in the beginning. Indeed, working with it does not allow you to learn about many
            problems of R that have been fixed by tidyverse workarounds. Regarding this R inferno,
            there is a full <a href="https://www.burns-stat.com/pages/Tutor/R_inferno.pdf">book</a>{" "}
            about it.
          </p>
        </blockquote>
        <p>
          Within the package system of R, there is a ecosystem called{" "}
          <a href="https://www.tidyverse.org/">tidyverse</a>. The tidyverse is an opinionated
          collection of R packages designed for data science. All packages share an underlying
          design philosophy, grammar, and data structures.
        </p>
        <p>
          When you install it with{" "}
          <code>install.packages(&quot;tidyverse&quot;,dependencies = TRUE)</code> and import it
          with <code>library(tidyverse)</code>, you import a group of packages that all work
          together using what is called a <strong>tidy data</strong> format:
        </p>
        <blockquote>
          <p>
            <em>
              «Tidy datasets are easy to manipulate, model and visualise, and have a specific
              structure: each variable is a column, each observation is a row, and each type of
              observational unit is a table. This framework makes it easy to tidy messy datasets
              because only a small set of tools are needed to deal with a wide range of un-tidy
              datasets. This structure also makes it easier to develop tidy tools for data analysis,
              tools that both input and output tidy datasets. The advantages of a consistent data
              structure and matching tools are demonstrated with a case study free from mundane data
              manipulation chores.»
            </em>
          </p>
          <p>
            From{" "}
            <a href="https://vita.had.co.nz/papers/tidy-data.html">
              Hadley Wickham, <strong>Tidy data.</strong>,{" "}
              <em>The Journal of Statistical Software</em>, vol. 59, 2014
            </a>
            . Check out the corresponding{" "}
            <a href="https://tidyr.tidyverse.org/articles/tidy-data.html">Tidyverse Article</a> as
            well.
          </p>
        </blockquote>
        <h3>The dplyr Package</h3>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          A very useful package in the tidyverse for managing data is called{" "}
          <a href="https://dplyr.tidyverse.org/">dplyr</a>.<code>dplyr</code> is a grammar of data
          manipulation, providing a <strong>consistent set of verbs</strong> that help you solve the
          most common data manipulation challenges:
        </p>
        <ul>
          <li>
            <code>mutate()</code> adds new variables that are functions of existing variables
          </li>
          <li>
            <code>select()</code> picks variables based on their names
          </li>
          <li>
            <code>filter()</code> picks cases based on their values
          </li>
          <li>
            <code>summarise()</code> reduces multiple values down to a single summary
          </li>
          <li>
            <code>arrange()</code> changes the ordering of the rows
          </li>
        </ul>
        <p>
          These all combine naturally with <code>group_by()</code> which allows you to perform any
          operation “by group”. You can learn more about them in{" "}
          <code>vignette(&quot;dplyr&quot;)</code>. As well as these single-table verbs,{" "}
          <code>dplyr</code> also provides a variety of two-table verbs, which you can learn about
          in <code>vignette(&quot;two-table&quot;)</code>.
        </p>
        <blockquote>
          <p>
            The best place to start learning about dplyr is the{" "}
            <a href="https://r4ds.had.co.nz/transform.html">data transformation chapter</a> in the{" "}
            <a href="https://r4ds.had.co.nz/index.html">R for data science</a> book.
          </p>
        </blockquote>
        <p>
          We can load sample data with the <code>mpg</code> command. This command loads the MPG
          (MilesPerGallon) dataframe containing observations collected by the US Environment
          Protection Agency on 38 models of cars. These observations provides fuel economy data from
          1999 and 2008.
        </p>
        <p>Code:</p>
        <pre>
          <code className="language-r">library(tidyverse) mpg</code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>
            # A tibble: 234 × 11 manufacturer model displ year cyl trans drv cty hwy fl class
            &lt;chr&gt; &lt;chr&gt; &lt;dbl&gt; &lt;int&gt; &lt;int&gt; &lt;chr&gt; &lt;chr&gt;
            &lt;int&gt; &lt;int&gt; &lt;chr&gt; &lt;chr&gt; 1 audi a4 1.8 1999 4 auto(l5) f 18 29 p
            compact 2 audi a4 1.8 1999 4 manual(m5) f 21 29 p compact 3 audi a4 2 2008 4 manual(m6)
            f 20 31 p compact 4 audi a4 2 2008 4 auto(av) f 21 30 p compact 5 audi a4 2.8 1999 6
            auto(l5) f 16 26 p compact 6 audi a4 2.8 1999 6 manual(m5) f 18 26 p compact 7 audi a4
            3.1 2008 6 auto(av) f 18 27 p compact 8 audi a4 quattro 1.8 1999 4 manual(m5) 4 18 26 p
            compact 9 audi a4 quattro 1.8 1999 4 auto(l5) 4 16 25 p compact 10 audi a4 quattro 2
            2008 4 manual(m6) 4 20 28 p compact # … with 224 more rows
          </code>
        </pre>
        <blockquote>
          <p>
            Check out what a <code>tibble</code> and a <code>tribble</code> are the{" "}
            <a href="https://r4ds.had.co.nz/tibbles.html">Tibbles chapter</a> in{" "}
            <a href="https://r4ds.had.co.nz/">R for data science</a>.
          </p>
        </blockquote>
        <p>
          Since we are with a built-in dataset is that documentation giving further descriptions and
          explanations is available via the help page:
        </p>
        <pre>
          <code className="language-r">?mpg</code>
        </pre>
        <h3>%…% and Pipe Operators</h3>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          A very useful command in <code>Dplyr</code> is the{" "}
          <a href="https://towardsdatascience.com/an-introduction-to-the-pipe-in-r-823090760d64">
            pipe operator
          </a>{" "}
          <code>%&gt;%</code>. The pipe operator, written as <code>%&gt;%</code>, has been a
          longstanding feature of the <code>magrittr</code> package for R. It takes the output of
          one function and passes it into another function as an argument. This allows us to{" "}
          <strong>link a sequence of analysis steps</strong>.
        </p>
        <blockquote>
          <p>
            To visualise this process, imagine a factory with different machines placed along a
            conveyor belt. Each machine is a function that performs a stage of our analysis, like
            filtering or transforming data. The pipe therefore works like a conveyor belt,
            transporting the output of one machine to another for further processing.
          </p>
        </blockquote>
        <p>
          In order to understand how it works, we need to know first what the <code>%...%</code>{" "}
          operators mean in R. Indeed, <code>%&gt;%</code> has no builtin meaning but the user (or a
          package) is free to define operators of the form <code>%whatever%</code> in any way they
          like. For example, this function will return a string consisting of its left argument
          followed by a comma and space and then it’s right argument:
        </p>
        <pre>
          <code className="language-r">
            &quot;%,%&quot; &lt;- function(x, y) paste0(x, &quot;, &quot;, y) # test run
            &quot;Hello&quot; %,% &quot;World&quot;
          </code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>[1] &quot;Hello, World&quot;</code>
        </pre>
        <p>
          Regarding common <code>%...% </code> operators:
        </p>
        <ul>
          <li>
            The base of R provides
            <ul>
              <li>
                <code>%*%</code> (matrix mulitiplication)
              </li>
              <li>
                <code>%/%</code> (integer division)
              </li>
              <li>
                <code>%in%</code> (is lhs a component of the rhs?)
              </li>
              <li>
                <code>%o%</code> (outer product)
              </li>
              <li>
                <code>%x%</code> (kronecker product)
              </li>
              <li>
                It is not clear whether <code>%%</code> falls in this category or not, but it
                represents modulo.
              </li>
            </ul>
          </li>
          <li>
            The <code>expm</code> package defines
            <ul>
              <li>
                <code>%^%</code> a matrix power operator
              </li>
            </ul>
          </li>
          <li>
            The <code>operators</code> package defines a large number of such operators such as
            <ul>
              <li>
                <code>%!in%</code> (for not <code>%in%</code>)
              </li>
              <li>
                see{" "}
                <a href="http://cran.r-project.org/web/packages/operators/operators.pdf">
                  http://cran.r-project.org/web/packages/operators/operators.pdf
                </a>{" "}
                for more…
              </li>
            </ul>
          </li>
          <li>
            The <code>igraph</code> package defines
            <ul>
              <li>
                <code>%--%</code> , <code>%-&gt;%</code> and <code>%&lt;-%</code> to select edges
              </li>
            </ul>
          </li>
          <li>
            The <code>lubridate</code> package defines
            <ul>
              <li>
                <code>%m+%</code> and <code>%m-%</code> to add and subtract months
              </li>
              <li>
                <code>%--%</code> to define an interval
              </li>
            </ul>
          </li>
        </ul>
        <p>
          Regarding the <strong>pipe operators</strong>:
        </p>
        <ul>
          <li>
            the <code>magrittr</code> package defined <code>%&gt;%</code> as discussed in the{" "}
            <a href="http://cran.r-project.org/web/packages/magrittr/vignettes/magrittr.html">
              magrittr vignette
            </a>
            .
          </li>
          <li>
            the <code>dplyr</code> package used to define a (now deprecated) <code>%.%</code>{" "}
            operator which is similar (check{" "}
            <a href="https://stackoverflow.com/questions/23621209/differences-between-dplyr-and-magrittr">
              this
            </a>{" "}
            for further details). However, now <code>dplyr</code> imports <code>%&gt;%</code> from{" "}
            <code>magrittr</code> making it available to the user.
          </li>
          <li>
            the <code>pipeR</code> package, defines a <code>%&gt;&gt;%</code> operator that is
            similar to magrittr’s <code>%&gt;%</code> and can be used as an alternative to it (see{" "}
            <a href="http://renkun.me/pipeR-tutorial/">http://renkun.me/pipeR-tutorial/</a>)
          </li>
          <li>
            the <code>postlogic</code> package defined <code>%if%</code> and <code>%unless%</code>{" "}
            operators.
          </li>
          <li>
            the <code>wrapr</code> package defines a dot pipe <code>%.&gt;%</code> that is an
            explicit version of <code>%&gt;%</code> in that it does not do implicit insertion of
            arguments but only substitutes explicit uses of dot on the right hand side. This can be
            considered as another alternative to <code>%&gt;%</code> (see{" "}
            <a href="https://winvector.github.io/wrapr/articles/dot_pipe.html">
              https://winvector.github.io/wrapr/articles/dot_pipe.html
            </a>
            )
          </li>
          <li>
            the development version of R has defined a <code>|&gt;</code> pipe. Unlike{" "}
            <code>magrittr</code>’s <code>%&gt;%</code> it can only substitute into the first
            argument of the right hand side. Although limited, it works via syntax transformation so
            it has no performance impact.
          </li>
        </ul>
        <h3>Clean and Re-shape with dplyr</h3>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Now that we know what the pipe operator <code>%&gt;%</code> does in <code>dplyr</code>, we
          can see how to concatenate <code>dplyr</code> functions in order to clean and reshape our
          data.
        </p>
        <p>Code:</p>
        <pre>
          <code className="language-r">
            mpg %&gt;% # &quot;filter&quot; - return all rows that satisfy conditions dplyr::filter(
            model == 'a4', # filter only a4 models ) %&gt;% # &quot;arrange&quot; - reorder your
            rows dplyr::arrange( displ, cyl, # reorder by &quot;displ&quot;, then by &quot;cyl&quot;
            ) %&gt;% # &quot;mutate&quot; - add column preserving all the other ones dplyr::mutate(
            old = year &lt; 2000, # add a &quot;old&quot; column that is true if &quot;year&quot; is
            before 2000 full_wheel_drive = drv == 'f', # add a &quot;full_wheel_drive&quot; column )
            %&gt;% # &quot;select&quot; - choose columns to keep or remove dplyr::select( -drv #
            remove &quot;full_wheel_drive&quot; )
          </code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>
            A tibble: 7 × 12 manufacturer model displ year cyl trans cty hwy fl class old
            full_wheel_drive &lt;chr&gt; &lt;chr&gt; &lt;dbl&gt; &lt;int&gt; &lt;int&gt; &lt;chr&gt;
            &lt;int&gt; &lt;int&gt; &lt;chr&gt; &lt;chr&gt; &lt;lgl&gt; &lt;lgl&gt; 1 audi a4 1.8
            1999 4 auto(l5) 18 29 p compact TRUE TRUE 2 audi a4 1.8 1999 4 manual(m5) 21 29 p
            compact TRUE TRUE 3 audi a4 2 2008 4 manual(m6) 20 31 p compact FALSE TRUE 4 audi a4 2
            2008 4 auto(av) 21 30 p compact FALSE TRUE 5 audi a4 2.8 1999 6 auto(l5) 16 26 p compact
            TRUE TRUE 6 audi a4 2.8 1999 6 manual(m5) 18 26 p compact TRUE TRUE 7 audi a4 3.1 2008 6
            auto(av) 18 27 p compact FALSE TRUE
          </code>
        </pre>
        <p>
          The <code>dplyr</code> package allows us to aggregate data as well.
        </p>
        <p>Code:</p>
        <pre>
          <code className="language-r">
            mpg %&gt;% # create aggregate stats and sort dplyr::count(model,sort = TRUE) %&gt;% #
            select only more than 8 counts dplyr::filter(n &gt; 8)
          </code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>
            {" "}
            model n &lt;chr&gt; &lt;int&gt; 1 caravan 2wd 11 2 ram 1500 pickup 4wd 10 3 civic 9 4
            dakota pickup 4wd 9 5 jetta 9 6 mustang 9
          </code>
        </pre>
        <h2>Plot Your Data: ggplot</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Probably one of the most if not the most popular package in R is the{" "}
          <a href="https://ggplot2.tidyverse.org/">ggplot2</a> package.
          <code>ggplot</code> is a system for declaratively creating graphics, based on{" "}
          <a href="https://www.amazon.com/Grammar-Graphics-Statistics-Computing/dp/0387245448/ref=as_li_ss_tl">
            The Grammar of Graphics
          </a>{" "}
          (“gg” stands for Grammar of Graphics). With <code>ggplot</code> You provide the data, tell{" "}
          <code>ggplot</code> how to map variables to aesthetics, what graphical primitives to use,
          and it takes care of the details.
        </p>
        <p>
          <code>ggplot</code> it is used all over the world by high-level academics, and PhDs, but
          also a lot of journalism reports use <code>ggplot</code> and R to actually create complex,
          highly detailed, and visually appealing visualizations.
        </p>
        <blockquote>
          <p>
            A ggplot specific characteristic which is likely not going to change (until an eventual
            future iteration “ggplot3” if it ever happens) is that Hadley Wickham created this
            package before he discovered the pipe operator. So,{" "}
            <strong>we can’t just pipe ggplot into the next function</strong>. That is the reason
            why we use <strong>instead the plus operator</strong> to carry on to the next action.
          </p>
        </blockquote>
        <p>Code:</p>
        <pre>
          <code className="language-r">
            ggplot(data = mpg) # make a ggplot with the mpg dataframe (without any layer, it is
            still a white canvas) + geom_point( # add a geom_point layer, i.e., a scatter plot
            mapping = aes( # &quot;aes&quot; means &quot;aesthetic&quot;, it states how to
            color/stylize/... the geom_point x = displ, y = hwy # scatter point mapping to the
            dataframe ) ) ggplot(data = mpg) + geom_point( mapping = aes( x = displ, y = hwy, color
            = class # add color classes to the scatter points ) )
          </code>
        </pre>
        <p>Plot:</p>
        <div className="text-center">
          <img
            alt="ggplot plot #1"
            src="/assets/images/posts/2022-01-02-r-getting-started/ggplot1.png"
            height={300}
          />
          <img
            alt="ggplot plot #2"
            src="/assets/images/posts/2022-01-02-r-getting-started/ggplot2.png"
            height={300}
          />
        </div>
        <p>
          You can use multiple geoms on a single chart and this is how you create very robust
          visualizations. Basically, it is like adding a layer of paint over your blank ggplot
          canvas using additional criteria and keep layering on that paint until you get an
          interesting visualization.
        </p>
        <p>Code:</p>
        <pre>
          <code className="language-r">
            ggplot(data = mpg) + geom_point(mapping = aes(x = displ, y = hwy)) + facet_wrap(~ class,
            nrow = 2) # facet graph based on class ggplot(data = mpg) + geom_point(mapping = aes(x =
            displ, y = hwy)) + facet_grid(drv ~ cyl) # facet grid based on (drv, cyl) pairs
          </code>
        </pre>
        <p>Plot:</p>
        <div className="text-center">
          <img
            alt="ggplot plot #3"
            src="/assets/images/posts/2022-01-02-r-getting-started/ggplot3-facet.png"
            height={300}
          />
          <img
            alt="ggplot plot #4"
            src="/assets/images/posts/2022-01-02-r-getting-started/ggplot4-facet-grid.png"
            height={300}
          />
        </div>
        <p>Code:</p>
        <pre>
          <code className="language-r">
            # aestetic mapping in ggplot common to all geom_ ggplot(data = mpg, mapping = aes(x =
            displ, y = hwy)) + geom_point() + # no more mapping (using the one defined up here)
            geom_smooth() # no more mapping (using the one defined up here) ggplot(data = mpg,
            mapping = aes(x = displ, y = hwy)) + geom_point(mapping = aes(color = class)) + # add
            coloring by class mapping geom_smooth()
          </code>
        </pre>
        <p>Plot:</p>
        <div className="text-center">
          <img
            alt="ggplot plot #5"
            src="/assets/images/posts/2022-01-02-r-getting-started/ggplot5-regression.png"
            height={300}
          />
          <img
            alt="ggplot plot #6"
            src="/assets/images/posts/2022-01-02-r-getting-started/ggplot6-regression-color.png"
            height={300}
          />
        </div>
        <h2>Examples of EDA (Exploratory Data Analysis)</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          Exploratory Data Analysis refers to the critical process of performing initial
          investigations on data so as to discover patterns,to spot anomalies,to test hypothesis and
          to check assumptions with the help of summary statistics and graphical representations.
        </p>
        <p>Let’s consider for this case a different dataset:</p>
        <pre>
          <code className="language-r">diamonds</code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>
            # A tibble: 53,940 × 10 carat cut color clarity depth table price x y z &lt;dbl&gt;
            &lt;ord&gt; &lt;ord&gt; &lt;ord&gt; &lt;dbl&gt; &lt;dbl&gt; &lt;int&gt; &lt;dbl&gt;
            &lt;dbl&gt; &lt;dbl&gt; 1 0.23 Ideal E SI2 61.5 55 326 3.95 3.98 2.43 2 0.21 Premium E
            SI1 59.8 61 326 3.89 3.84 2.31 3 0.23 Good E VS1 56.9 65 327 4.05 4.07 2.31 4 0.29
            Premium I VS2 62.4 58 334 4.2 4.23 2.63 5 0.31 Good J SI2 63.3 58 335 4.34 4.35 2.75 6
            0.24 Very Good J VVS2 62.8 57 336 3.94 3.96 2.48 7 0.24 Very Good I VVS1 62.3 57 336
            3.95 3.98 2.47 8 0.26 Very Good H SI1 61.9 55 337 4.07 4.11 2.53 9 0.22 Fair E VS2 65.1
            61 337 3.87 3.78 2.49 10 0.23 Very Good H VS1 59.4 61 338 4 4.05 2.39 # … with 53,930
            more rows
          </code>
        </pre>
        <p>
          Since we are with a built-in dataset is that documentation giving further descriptions and
          explanations is available via the help page:
        </p>
        <pre>
          <code className="language-r">?diamonds</code>
        </pre>
        <p>We can start by plotting a bar chart of the diamond cuts:</p>
        <pre>
          <code className="language-r">
            # bar chart on diamonds dataset ggplot(data = diamonds) + geom_bar(mapping = aes(x =
            cut))
          </code>
        </pre>
        <p>Plot:</p>
        <div className="text-center">
          <img
            alt="ggplot plot #7"
            src="/assets/images/posts/2022-01-02-r-getting-started/ggplot7-diamonds-bar.png"
            height={300}
          />
        </div>
        <p>We can now filter, for example, based on the diamond carats:</p>
        <pre>
          <code className="language-r">
            count(diamonds) # the variable &quot;smaller&quot; receives the output of # the diamonds
            being filtered with carat &lt; 3, # hence &quot;smaller&quot; is true when carat &lt; 3
            smaller &lt;- diamonds %&gt;% filter(carat &lt; 3) count(smaller)
          </code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>
            # A tibble: 1 × 1 n &lt;int&gt; 1 53940 # A tibble: 1 × 1 n &lt;int&gt; 1 53900
          </code>
        </pre>
        <p>
          Hence, we have only 40 diamonds with more than 2 carats. Now, using our original{" "}
          <code>diamonds</code> dataset, we can plot the histogram distributions with bin of 0.2 and
          0.5:
        </p>
        <pre>
          <code className="language-r">
            ggplot(data = diamonds, mapping = aes(x = carat)) + geom_histogram(binwidth = 0.2)
            ggplot(data = diamonds, mapping = aes(x = carat)) + geom_histogram(binwidth = 0.5)
          </code>
        </pre>
        <p>Plot:</p>
        <div className="text-center">
          <img
            alt="ggplot plot #8"
            src="/assets/images/posts/2022-01-02-r-getting-started/ggplot8-diamonds.png"
            height={300}
          />
          <img
            alt="ggplot plot #9"
            src="/assets/images/posts/2022-01-02-r-getting-started/ggplot9-diamonds.png"
            height={300}
          />
        </div>
        <p>
          So, from this distribution, we understand that we have a lot of diamonds with low carats.
        </p>
        <p>
          We can then create a boxplot in order to study further such data. For example, we can see
          how the carats distribution behaves cut-wise:
        </p>
        <pre>
          <code className="language-r">
            ggplot(data = diamonds) + geom_boxplot( mapping = aes( x = reorder(cut, carat, FUN =
            median), y = carat ) )
          </code>
        </pre>
        <p>Plot:</p>
        <div className="text-center">
          <img
            alt="ggplot plot #10"
            src="/assets/images/posts/2022-01-02-r-getting-started/ggplot10-diamonds-boxplot.png"
            height={300}
          />
        </div>
        <p>
          In the box plot, all the dots are the outliers, while the boxes represent the median and
          the inner-quarter ranges.
        </p>
        <p>We can as well countd diamonds by color and cut, and then sort the results:</p>
        <pre>
          <code className="language-r">
            diamonds %&gt;% count(color, cut, sort = T) # (T is TRUE)
          </code>
        </pre>
        <p>Output:</p>
        <pre>
          <code>
            # A tibble: 35 × 3 color cut n &lt;ord&gt; &lt;ord&gt; &lt;int&gt; 1 G Ideal 4884 2 E
            Ideal 3903 3 F Ideal 3826 4 H Ideal 3115 5 G Premium 2924 6 D Ideal 2834 7 E Very Good
            2400 8 H Premium 2360 9 E Premium 2337 10 F Premium 2331 # … with 25 more rows
          </code>
        </pre>
        <p>We can then rearrange such output in a more “aesthetic” way by using a heatmap:</p>
        <pre>
          <code className="language-r">
            diamonds %&gt;% count(color, cut, sort = T) %&gt;% ggplot(mapping = aes(x = color, y =
            cut)) + geom_tile(mapping = aes(fill = n))
          </code>
        </pre>
        <p>Plot:</p>
        <div className="text-center">
          <img
            alt="ggplot plot #10"
            src="/assets/images/posts/2022-01-02-r-getting-started/ggplot11-diamonds-heatmap.png"
            height={300}
          />
        </div>
        <h2>Import Data from Your Files: readr</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          A very simple and handy data format for tabular data is CSV. The goal of the{" "}
          <code>readr</code> package is to provide a fast and friendly way to read rectangular data
          (like CSV, TSB, and FWF). It is designed to flexibly parse many types of data found in the
          wild, while still cleanly failing when data unexpectedly changes.
        </p>
        <p>
          Import a csv into an R dataframe with <code>readr</code> is pretty simple:
        </p>
        <pre>
          <code className="language-r">
            library(readr) data &lt;- read_csv(&quot;path/to/data.csv&quot;)
          </code>
        </pre>
        <blockquote>
          <p>
            The best place to start knowing <code>readr</code> is the{" "}
            <a href="https://r4ds.had.co.nz/data-import.html">data import chapter</a> in{" "}
            <a href="https://r4ds.had.co.nz/">R for data science</a>.
          </p>
        </blockquote>
        <h2>Bonus: Useful Packages</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>Here, we just report some really cool and simple packages madea available in R.</p>
        <h3>datapasta</h3>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          <a href="https://milesmcbain.github.io/datapasta/">
            <code>datapasta</code>
          </a>{" "}
          is about reducing resistance associated with copying and pasting data to and from R. It
          allows you to quickly copy from data (even html tables on websites!)
        </p>
        <h3>esquisse</h3>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          <a href="https://dreamrs.github.io/esquisse/">
            <code>esquisse</code>
          </a>{" "}
          allow you to interactively explore your data by visualizing it with the{" "}
          <code>ggplot2</code> package. It allows you to draw bar plots, curves, scatter plots,
          histograms, boxplot and sf objects, then export the graph or retrieve the code to
          reproduce the graph.
        </p>
        <pre>
          <code className="language-r">install.packages(&quot;esquisse&quot;)</code>
        </pre>
        <p>
          After installing it you can find <code>esquisse</code> in the add-ins menu:
        </p>
        <div className="text-center">
          <img
            alt="esquisse in addins"
            src="/assets/images/posts/2022-01-02-r-getting-started/esquisse-addins.png"
            height={300}
          />
        </div>
        <p>
          Then you can use the ggplot2 builder to select a dataset, build complex plots, and
          automatically generate the necessary R code. For example:
        </p>
        <pre>
          <code className="language-r">
            library(esquisse) library(ggplot2) ggplot(diamonds) + aes(x = carat, y = price) +
            geom_point(size = 1L, colour = &quot;#26828e&quot;) + geom_smooth(span = 0.75) + labs(x
            = &quot;carat&quot;, y = &quot;price&quot;, title = &quot;heres my title&quot;, subtitle
            = &quot;a view of diamonds&quot;, caption = &quot;hello caption&quot;) + theme_minimal()
          </code>
        </pre>
        <p>Plot:</p>
        <div className="text-center">
          <img
            alt="esquisse fancy plot #1"
            src="/assets/images/posts/2022-01-02-r-getting-started/esquisse-fancyplot1.png"
            height={300}
          />
        </div>
        <h3>rayshader</h3>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <p>
          <a href="https://www.rayshader.com/">
            <code>rayshader</code>
          </a>{" "}
          is an open source package for producing 2D and 3D data visualizations in R.{" "}
          <code>rayshader</code> uses elevation data in a base R matrix and a combination of
          raytracing, spherical texture mapping, overlays, and ambient occlusion to generate
          beautiful topographic 2D and 3D maps. In addition to maps, <code>rayshader</code> also
          allows the user to translate <code>ggplot2</code> objects into beautiful 3D data
          visualizations.
        </p>
        <p>
          The models can be rotated and examined interactively or the camera movement can be
          scripted to create animations. Scenes can also be rendered using a high-quality
          pathtracer, <strong>rayrender</strong>.The user can also create a cinematic depth of field
          post-processing effect to direct the user’s focus to important regions in the figure. The
          3D models can also be exported to a 3D-printable format with a built-in STL export
          function
        </p>
        <h2>Resources</h2>
        <p>
          <a href="#contents">↑ back to contents ↑</a>
        </p>
        <ul>
          <li>
            <a href="https://www.r-project.org/">Site | R Project</a>
          </li>
          <li>
            <a href="https://www.rstudio.com/">Site | RStudio</a>
          </li>
          <li>
            <a href="https://www.rocker-project.org/">Site | The Rocker Project</a>
          </li>
          <li>
            <a href="https://r4ds.had.co.nz/index.html">Book | R for Data Science</a>
          </li>
          <li>
            <a href="https://bookdown.org/yihui/rmarkdown/">
              Book | R Markdown: The Definitive Guide
            </a>
          </li>
          <li>
            <a href="https://adv-r.hadley.nz/">Book | Advanced R</a>
          </li>
          <li>
            <a href="https://www.burns-stat.com/pages/Tutor/R_inferno.pdf">Book | R Inferno</a>
          </li>
          <li>
            <a href="https://towardsdatascience.com/an-introduction-to-the-pipe-in-r-823090760d64">
              Blog | An Introduction to the Pipe Operator
            </a>
          </li>
          <li>
            <a href="https://www.rstudio.com/wp-content/uploads/2015/02/rmarkdown-cheatsheet.pdf">
              Cheatsheet | R Markdown
            </a>
          </li>
          <li>
            <a href="https://github.com/rstudio/cheatsheets/blob/main/data-visualization-2.1.pdf">
              Cheatsheet | ggplot2
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/watch?v=ZYdXI1GteDE">
              YouTube | R Programming Crash Course
            </a>
          </li>
        </ul>
      </>
    </ArticlePage>
  );
}
