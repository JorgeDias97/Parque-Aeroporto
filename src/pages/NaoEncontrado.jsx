import { Link } from 'react-router-dom';
import styles from './NaoEncontrado.module.css';

export default function NaoEncontrado() {
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>404</h1>
            <h2 className={styles.subtitulo}>Página não encontrada</h2>
            <p className={styles.mensagem}>
                A página que tentaste aceder não existe ou foi movida. Verifica se o endereço está correto.
            </p>
            <Link 
                to="/" 
                className={styles.btnVoltar}
            >
                Voltar à Página Inicial
            </Link>
        </div>
    );
}

