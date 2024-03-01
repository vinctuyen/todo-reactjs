import styled from "@emotion/styled";
import TodoFooter from "./components/TodoFooter";
import TodoList from "./components/TodoList";
import TodoHeader from "./components/TodoHeader";

const MainHeader = styled.header`
  text-align: center;
  padding-top: .5rem;

  & h1 {
    color: #b83f45;
    font-size: 3rem;
    font-weight: 200;
    margin: 1rem 0;

    @media (min-width: 48rem) {
      font-size: 5rem;
      margin: 0;
    }
  }
`;

const Wrapper = styled.main`
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const MainFooter = styled.footer`
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: #4d4d4d;
  text-shadow: 0 1px 0 hsla(0, 0%, 100%, 0.5);

  @media (min-width: 48rem) {
    margin-top: 4rem;
    margin-bottom: 2rem;
  }
`;

function App() {
  return (
    <>
      <MainHeader className="container">
        <h1>todos</h1>
      </MainHeader>
      <main className="container">
        <Wrapper>
          <TodoHeader />
          <TodoList />
          <TodoFooter/>
        </Wrapper>
      </main>
      <MainFooter className="container">
        <p>Double-click to edit a todo</p>
      </MainFooter>
    </>
  );
}

export default App;
