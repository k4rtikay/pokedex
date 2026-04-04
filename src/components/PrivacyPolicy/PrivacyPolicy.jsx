import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./PrivacyPolicy.scss";

export default function PrivacyPolicy() {
    return (
        <>
            <title>Privacy Policy - HueDex</title>
            <meta
                name="description"
                content="Privacy Policy for HueDex - Learn how we handle your data."
            />

            <motion.div
                className="privacy-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <header className="privacy-header">
                    <Link to="/" className="privacy-back">
                        <span className="material-symbols-rounded">arrow_back</span>
                        Back
                    </Link>
                    <h1>HueDex</h1>
                </header>

                <main className="privacy-content">
                    <h2>Privacy Policy</h2>
                    <p className="privacy-updated">Last updated: April 4, 2026</p>

                    <section>
                        <h3>Overview</h3>
                        <p>
                            HueDex is a web application that generates color palettes from
                            Pokémon sprites. This policy explains what data we collect, how we
                            use it, and your rights regarding that data.
                        </p>
                    </section>

                    <section>
                        <h3>Data We Collect</h3>
                        <p>When you create an account, we collect:</p>
                        <ul>
                            <li>
                                <strong>Email address</strong> — used for authentication and
                                account recovery.
                            </li>
                            <li>
                                <strong>Username</strong> — used to identify your account within
                                the app.
                            </li>
                            <li>
                                <strong>Saved palettes</strong> — color palettes you choose to
                                save are stored in your account.
                            </li>
                        </ul>
                        <p>
                            If you sign in with Google, we receive your name, email, and
                            profile picture from Google. We do not access any other Google
                            account data.
                        </p>
                    </section>

                    <section>
                        <h3>How We Use Your Data</h3>
                        <ul>
                            <li>To authenticate you and manage your account.</li>
                            <li>To save and retrieve your color palettes.</li>
                            <li>
                                To improve the app through anonymous usage analytics (page
                                views, feature usage).
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h3>Third-Party Services</h3>
                        <p>We use the following Firebase services provided by Google:</p>
                        <ul>
                            <li>
                                <strong>Firebase Authentication</strong> — handles sign-in and
                                account management.
                            </li>
                            <li>
                                <strong>Cloud Firestore</strong> — stores your saved palettes
                                and account data.
                            </li>
                            <li>
                                <strong>Google Analytics for Firebase</strong> — collects
                                anonymous usage data to help us improve the app.
                            </li>
                        </ul>
                        <p>
                            These services are governed by{" "}
                            <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google's Privacy Policy
                            </a>
                            .
                        </p>
                    </section>

                    <section>
                        <h3>Data Retention</h3>
                        <p>
                            Your data is retained as long as your account is active. If you
                            wish to delete your account and all associated data, please
                            contact us on the email given below and we will process your request promptly.
                        </p>
                    </section>

                    <section>
                        <h3>Your Rights</h3>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access the personal data we hold about you.</li>
                            <li>Request correction of inaccurate data.</li>
                            <li>Request deletion of your account and data.</li>
                            <li>Withdraw consent for data processing at any time.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>Cookies</h3>
                        <p>
                            HueDex uses essential cookies for authentication session
                            management. Google Analytics may also set cookies to collect
                            anonymous usage data. No advertising cookies are used.
                        </p>
                    </section>

                    <section>
                        <h3>Children's Privacy</h3>
                        <p>
                            HueDex is not directed at children under 13. We do not knowingly
                            collect personal data from children. If you believe a child has
                            provided us with personal data, please contact us so we can remove
                            it.
                        </p>
                    </section>

                    <section>
                        <h3>Legal Basis for Processing (GDPR)</h3>
                        <p>We process your data based on:</p>
                        <ul>
                            <li>Your consent (e.g., when signing up).</li>
                            <li>The necessity to provide our service.</li>
                            <li>Legitimate interests (e.g., improving the app).</li>
                        </ul>
                    </section>

                    <section>
                        <h3>Changes to This Policy</h3>
                        <p>
                            We may update this privacy policy from time to time. Changes will
                            be reflected on this page with an updated date.
                        </p>
                    </section>

                    <section>
                        <h3>Contact</h3>
                        <p>
                            If you have any questions about this privacy policy or want to delete your data, please reach
                            out at{" "}
                            <a href="mailto:k4rtikweb@gmail.com">k4rtikweb@gmail.com</a>.
                        </p>
                    </section>
                </main>
            </motion.div>
        </>
    );
}
