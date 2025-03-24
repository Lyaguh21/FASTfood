import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

export default function App() {
  return (
    <>
      <Button className="mr-6">Применить</Button>
      <Button appearance="big">Оформить</Button>
      <Input placeholder="Email" type="email" />
    </>
  );
}
