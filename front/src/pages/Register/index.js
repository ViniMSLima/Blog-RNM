import { Col, Row } from "react-bootstrap";
import styles from './styles.module.scss';
import CardRegister from "../../components/cardregister";
import AlertComponent from "../../components/alertcomponent";

export default function RegisterPage() {
    return (
        <Col className={styles.container}>
            <Row className={styles.container__row}>
                <Col xs={12} sm={8} md={4}>
                    <AlertComponent />
                    <CardRegister />
                </Col>
            </Row>
        </Col>
    )
}