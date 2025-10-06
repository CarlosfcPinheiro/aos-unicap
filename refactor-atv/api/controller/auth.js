import models from "../models"

const User = models.User;

const authLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: "Email ou senha inválidos ou usuário inexistente" });
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

    res.json({ token });
}

export {
    authLogin
}