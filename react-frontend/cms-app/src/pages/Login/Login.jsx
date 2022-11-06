import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userApi from "../../services/axios/userApi";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Đăng nhập";
  });

  const { loginWithEmail } = userApi;

  const handleLogin = async (e) => {
    e.preventDefault();

    loginWithEmail({
      email: email,
      password: password,
    }).then((resp) => {
      if (resp.status !== 'OK') {
        toast.error("Đăng nhập không thành công!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      return resp.data;
    }).then(data => {
      setToken(data.accessToken);
      toast.success("Đăng nhập thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate('/');
    }).catch(err => {
      toast.error("Đăng nhập không thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  };

  return (
    <section class="login-page section main-section flex justify-center items-center h-screen">
      <div class="card max-w-lg w-full">
        <header class="card-header">
          <p class="card-header-title">
            <span class="icon">
              <i class="mdi mdi-lock"></i>
            </span>
            Đăng nhập
          </p>
        </header>
        <div class="card-content">
          <form onSubmit={handleLogin}>
            <div class="field spaced">
              <label class="label">Email</label>
              <div class="control icons-left">
                <input
                  class="input"
                  type="text"
                  name="login"
                  placeholder="user@example.com"
                  autocomplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span class="icon is-small left">
                  <i class="mdi mdi-account"></i>
                </span>
              </div>
            </div>

            <div class="field spaced">
              <label class="label">Mật khẩu</label>
              <p class="control icons-left">
                <input
                  class="input"
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  autocomplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span class="icon is-small left">
                  <i class="mdi mdi-asterisk"></i>
                </span>
              </p>
            </div>
            <hr />

            <div class="field grouped">
              <div class="control">
                <button type="submit" class="button blue">
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
