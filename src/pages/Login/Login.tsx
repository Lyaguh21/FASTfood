import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Title from "../../components/ui/Title";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../helpers/API";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../storage/store";
import { userActions } from "../../storage/user.slice";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

type LoginResponse = {
  access_token: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email,
        password,
      });
      dispatch(userActions.addJWT(data.access_token)); //Добавление в хранилище redux
      navigate("/");
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(true);
      }
    }
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
