import {
  DivCol2Last,
  DivCol3,
  DivContainer,
  DivRow,
  H2,
  P,
  Strong,
} from "./History";

export function Use() {
  return (
    <DivContainer>
      <DivRow>
        <DivCol3>
          <H2>1. Web Applications</H2>
          <P>
            As day-by-day there is a continuous improvement in the browsers, so
            JavaScript gained popularity for making robust web applications. We
            can understand it by taking the example of{" "}
            <Strong>Google Maps.</Strong> In Maps user just requires to click
            and drag the mouse; the details are visible just by a click. There
            is a use of JavaScript behind these concepts.
          </P>
        </DivCol3>
        <DivCol3>
          <H2>2. Web Development</H2>
          <P>
            JavaScript is commonly used for creating web pages. It allows us to
            add dynamic behavior to the webpage and add special effects to the
            webpage. On websites, it is mainly used for validation purposes.
            JavaScript helps us to execute complex actions and also enables the
            interaction of websites with visitors.
          </P>
        </DivCol3>
        <DivCol3>
          <H2>3. Mobile Applications</H2>
          <P>
            Now a days mobile devices are broadly used for accessing the
            internet. Using JavaScript, we can also build an application for
            non-web contexts. The features and uses of JavaScript make it a
            powerful tool for creating mobile applications. The{" "}
            <Strong>React Native</Strong> is the widely used JavaScript
            framework for creating mobile applications.
          </P>
        </DivCol3>
      </DivRow>
      <DivRow>
        <DivCol3>
          <H2>4. Game</H2>
          <P>
            JavaScript is also used for creating games. It has various libraries
            and frameworks for creating a game. The game can either be a 2D or
            3D. Some JavaScript game engines such as PhysicsJS, Pixi.js help us
            to create a web game.
          </P>
        </DivCol3>
        <DivCol3>
          <H2>5. Presentations</H2>
          <P>
            JavaScript also helps us to create presentations as a website. The
            libraries, such as RevealJs, and BespokeJs, can be used to create a
            web-based slide deck. They are easier to use, so we can easily make
            something amazing in a short time.
          </P>
        </DivCol3>
        <DivCol3>
          <H2>6. Server Applications</H2>
          <P>
            A large number of web applications have a server-side to them.
            JavaScript is used to generate content and handle HTTP requests.
            JavaScript can also run on servers through Node.js. The Node.js
            provides an environment containing the necessary tools required for
            JavaScript to run on servers.
          </P>
        </DivCol3>
      </DivRow>
      <DivRow>
        <DivCol2Last>
          <H2>7. Web Servers</H2>
          <P>
            A web server can be created by using <Strong>Node.js.</Strong>{" "}
            Node.js is event-driven and not waits for the response of the
            previous call. The servers created using Node.js are fast and dont
            use buffering and transfer chunks of data. The HTTP module can be
            used to create the server by using the createServer() method. This
            method executes when someone tries to access the port 8080. As a
            response, the HTTP server should display HTML and should be included
            in the HTTP header.
          </P>
        </DivCol2Last>
      </DivRow>
    </DivContainer>
  );
}

export default Use;
