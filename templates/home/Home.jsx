import { CardComponent } from "../../components/card/Card";
import styles from "./Home.module.css";

export const HomeTemplate = () => {
  return (
    <div className={styles.container}>
      <CardComponent
        title="Stacking"
        text="Haz stacking"
        textBtn="Stake"
        textBtn2="Unstake"
        img="https://kriptomat.io/wp-content/uploads/2021/12/article_what-is-staking.png"
      />
      <CardComponent
        title="Rewards"
        text="Retira tus rewards"
        textBtn="Stake"
        textBtn2="Unstake"
        img="https://lh3.googleusercontent.com/r9Ho60T4AFg5tES63Yvz67s0mZIOxZQqb1cimkFDmJM1sJuRaj6FEf0WpJXLlL7hZ4Ox_8IOV4nASqp-eFac1b-WVH5ySLOEAxkLABZsmQn2xJGWH9H_jElI_hYdrkT0uWDaeZfgqnM_Ef-35Gf--UuBTe56m9AiMBoVwJbByNaG5vbkueZxwPzHRw"
      />
    </div>
  );
};
