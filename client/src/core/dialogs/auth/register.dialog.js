import React, {useState} from 'react';
import DialogWrapper from '../../../core/services/dialog/DialogWrapper';

function App(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={submit}>
      <DialogWrapper onClose={props.cancel}
        header={<label>Sign Up</label>}
        body={
          <div>
            <label htmlFor="emailaAddress">
              Email Address
              <input id="emailAddress" name="emailAddress" type="email" value={email} required="required" onChange={($event) => setEmail($event.target.value)}/>
            </label>

            <label htmlFor="password">
              Password
              <input id="password" name="password" type="password" required="required" value={password}  onChange={($event) => setPassword($event.target.value)}/>
            </label>
          </div>
        }
        footer={
          <span>
            <button className="button large dark main full" data-icon="lock">Sign Up</button>
            <div>
                already have an account? <span className="link" onClick={() => props.hide({signIn: true})}>Sign In</span>
            </div>
          </span>
        }
      />
    </form>
  );

  function submit(e) {
    e.preventDefault();
    props.send && props.send({email, password}).then(props.hide).catch(console.log);
  }
}

export default App;
