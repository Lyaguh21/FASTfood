import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Title from "../../components/ui/Title";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../storage/store";
import { register, userActions } from "../../storage/user.slice";
import ErrorAuthBlock from "../../components/ui/ErrorAuthblock";
export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};
export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const error = useSelector((s: RootState) => s.user.registerErrorMessage);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;

    await dispatch(
      register({
        email: email.value,
        password: password.value,
        name: name.value,
      })
    );
  };
  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);
  return (
    <section className="px-[150px] pt-[108px]">
      <ErrorAuthBlock error={error} text="Такой пользователь уже существует" />

      <Title className="mb-[30px]">Регистрация</Title>

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

        <div>
          <Label htmlFor="name">Имя</Label>
          <Input placeholder="Имя" id="name" type="text" className="mt-1" />
        </div>

        <div className="flex flex-col mt-[20px] items-center gap-[20px]">
          <Button appearance="big">Зарегистрироваться</Button>

          <h2 className="flex flex-col items-center">
            <div>Есть аккаунт?</div>
            <Link
              to={"/auth/login"}
              className="text-orangeMain hover:text-orangeHover "
            >
              Войти
            </Link>
          </h2>
        </div>
      </form>
    </section>
  );
}
