import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Title from "../../components/ui/Title";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../storage/store";
import { login, userActions } from "../../storage/user.slice";
import ErrorAuthBlock from "../../components/ui/ErrorAuthblock";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export type LoginResponse = {
  access_token: string;
};

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const error = useSelector((s: RootState) => s.user.loginErrorMessage);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await dispatch(login({ email: email.value, password: password.value }));
  };

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  return (
    <section className="px-[150px] pt-[108px]">
      <ErrorAuthBlock error={error} text="Такого пользователя не существует" />

      <Title className="mb-[30px]">Вход</Title>
      <form action="" className="flex flex-col gap-[30px]" onSubmit={submit}>
        <div>
          <Label htmlFor="name">Ваш email</Label>
          <Input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="name">Ваш пароль</Label>
          <Input
            placeholder="Пароль"
            id="password"
            type="password"
            name="password"
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
