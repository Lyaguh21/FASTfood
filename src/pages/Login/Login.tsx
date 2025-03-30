import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Title from "../../components/ui/Title";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../storage/store";
import { login, userActions } from "../../storage/user.slice";

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
    await sendLogin(email.value, password.value);
  };

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <section className="px-[150px] pt-[172px]">
      <Title className="mb-[30px]">Вход</Title>
      {error && (
        <div className="flex flex-col items-center mb-[30px]">
          <h2 className="text-[#e02222]">Такого пользователя не существует!</h2>
          <h2 className="text-[#e02222]">Проверьте корректность данных</h2>
        </div>
      )}
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
