import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Title from "../../components/ui/Title";
import { FormEvent } from "react";

export default function Login() {
  const submit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <section className="px-[150px] pt-[172px]">
      <Title className="mb-[30px]">Вход</Title>
      <form action="" className="flex flex-col gap-[30px]" onSubmit={submit}>
        <div>
          <Label htmlFor="name">Ваш email</Label>
          <Input placeholder="Email" type="email" id="email" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="name">Ваш пароль</Label>
          <Input
            placeholder="Пароль"
            id="password"
            type="password"
            className="mt-1"
          />
        </div>

        <div className="flex flex-col mt-[20px] items-center gap-[20px]">
          <Button appearance="big">Вход</Button>

          <h2 className="flex flex-col items-center">
            <div>Нет аккаунта?</div>
            <Link
              to={"/auth/register"}
              className="text-orangeMain hover:text-orangeHover "
            >
              Зарегистрироваться
            </Link>
          </h2>
        </div>
      </form>
    </section>
  );
}
